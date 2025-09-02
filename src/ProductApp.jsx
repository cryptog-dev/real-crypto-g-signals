import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import AdminControls from "./components/AdminControls";
import UserFeatures from "./components/UserFeatures";
import RecentSignals from "./components/RecentSignals";
import RecentBlogs from "./components/RecentBlogs";
import SignalsList from "./components/SignalsList";
import BlogsList from "./components/BlogsList";
import ChartsTab from "./components/ChartsTab";
import CreateEditModal from "./components/CreateEditModal";
import WelcomeToast from "./components/WelcomeToast";
import { Home, Signal, BookOpen, BarChart } from "lucide-react";
import { blogsAPI, signalsAPI } from "./utils/api";

const ProductApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const { user, isAdmin, isPremium } = useAuth();
  const { darkMode } = useTheme();

  const isFree = () => !isAdmin() && !isPremium();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    coin: "",
    direction: "buy",
    entry_price: "",
    leverage: "",
    stop_loss: "",
    targets: "",
    status: "pending",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleNavTabChange = (event) => {
      const tabName = event.detail;
      if (["dashboard", "signals", "blogs", "charts"].includes(tabName)) {
        setActiveTab(tabName);
      }
    };

    window.addEventListener("navTabChange", handleNavTabChange);
    return () => window.removeEventListener("navTabChange", handleNavTabChange);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [blogsResponse, signalsResponse] = await Promise.all([
        blogsAPI.getAll(),
        signalsAPI.getAll(),
      ]);
      setBlogs(blogsResponse.data);
      setSignals(signalsResponse.data);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setError("Failed to load market data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      image: "",
      coin: "",
      direction: "buy",
      entry_price: "",
      leverage: "",
      stop_loss: "",
      targets: "",
      status: "pending",
    });
    setShowCreateModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      content: item.content || "",
      image: item.image || "",
      coin: item.coin || "",
      direction: item.direction || "buy",
      entry_price: item.entry_price || "",
      leverage: item.leverage || "",
      stop_loss: item.stop_loss || "",
      targets:
        typeof item.targets === "string"
          ? item.targets
          : JSON.stringify(item.targets || {}),
      status: item.status || "pending",
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm("Confirm deletion of this trade signal or analysis?")) {
      try {
        if (type === "blog") {
          await blogsAPI.delete(id);
          setBlogs(blogs.filter((blog) => blog.id !== id));
        } else {
          await signalsAPI.delete(id);
          setSignals(signals.filter((signal) => signal.id !== id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "blog") {
        const blogData = {
          title: formData.title,
          content: formData.content,
          image: formData.image,
        };
        if (editingItem) {
          await blogsAPI.update(editingItem.id, blogData);
          setBlogs(
            blogs.map((blog) =>
              blog.id === editingItem.id ? { ...blog, ...blogData } : blog
            )
          );
        } else {
          const response = await blogsAPI.create(blogData);
          setBlogs([...blogs, response.data]);
        }
      } else {
        const signalData = {
          coin: formData.coin,
          direction: formData.direction,
          entry_price: parseFloat(formData.entry_price),
          leverage: parseInt(formData.leverage),
          stop_loss: parseFloat(formData.stop_loss),
          targets: formData.targets,
          status: formData.status,
        };
        if (editingItem) {
          await signalsAPI.update(editingItem.id, signalData);
          setSignals(
            signals.map((signal) =>
              signal.id === editingItem.id
                ? { ...signal, ...signalData }
                : signal
            )
          );
        } else {
          const response = await signalsAPI.create(signalData);
          setSignals([...signals, response.data]);
        }
      }
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item. Please check your input and try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-positive bg-[var(--color-accent1)]/20 border border-[var(--color-accent1)]/30";
      case "fail":
        return "text-negative bg-[var(--color-secondary)]/20 border border-[var(--color-secondary)]/30";
      case "pending":
        return "text-[var(--color-accent2)] bg-[var(--color-accent2)]/20 border border-[var(--color-accent2)]/30";
      default:
        return "text-contrast-medium bg-[var(--color-neutral-dark)]/10 border border-[var(--color-neutral-dark)]/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-neutral-light)] flex items-center justify-center">
        <div className="lego-card p-8 rounded-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[var(--color-primary)] mx-auto"></div>
          <p className="mt-4 text-contrast-high font-medium text-lg">
            Loading your wealth dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-neutral-light)] flex items-center justify-center">
        <div className="lego-card p-8 rounded-lg text-center">
          <p className="text-negative text-lg font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="lego-button mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)] transition-colors duration-300 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">

{/* Navigation Tabs - Desktop */}
<div className="hidden md:block mb-8 bg-[var(--color-neutral-light)]">
  <div className="overflow-x-auto">
    <nav className="flex space-x-2 md:space-x-4 px-2 md:px-0 w-max max-w-full mx-auto">
      {[
        { id: "dashboard", name: "Dashboard", icon: Home },
        { id: "signals", name: "Trade Signals", icon: Signal },
        { id: "blogs", name: "Market Analysis", icon: BookOpen },
        { id: "charts", name: "Price Charts", icon: BarChart },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`lego-button flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-[var(--color-primary)] text-white border-b-4 border-[var(--color-border-dark)]"
              : "bg-[var(--color-card-bg)] text-contrast-high border-b-4 border-[var(--color-border-light)] hover:border-[var(--color-border-hover)]"
          }`}
        >
          <tab.icon className="h-5 w-5" />
          <span className="whitespace-nowrap">{tab.name}</span>
        </button>
      ))}
    </nav>
  </div>
</div>

{/* Mobile Bottom Nav */}
<div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-card-bg)] border-t border-[var(--color-border-light)] flex justify-around py-2 z-50">
  {[
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "signals", name: "Signals", icon: Signal },
    { id: "blogs", name: "Blogs", icon: BookOpen },
    { id: "charts", name: "Charts", icon: BarChart },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex flex-col items-center text-xs transition-colors ${
        activeTab === tab.id
          ? "text-[var(--color-primary)]"
          : "text-contrast-medium hover:text-[var(--color-primary)]"
      }`}
    >
      <tab.icon className="h-6 w-6 mb-0.5" />
      <span>{tab.name}</span>
    </button>
  ))}
</div>



        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <DashboardStats signals={signals} blogs={blogs} />
            {isAdmin() ? (
              <AdminControls handleCreate={handleCreate} />
            ) : (
              <UserFeatures isPremium={isPremium} isFree={isFree} />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentSignals
                signals={signals}
                getStatusColor={getStatusColor}
                formatDate={formatDate}
              />
              <RecentBlogs blogs={blogs} formatDate={formatDate} />
            </div>
          </div>
        )}

        {/* Signals Tab */}
        {activeTab === "signals" && (
          <SignalsList
            signals={signals}
            isAdmin={isAdmin}
            isFree={isFree}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
            isPremium={isPremium}
          />
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <BlogsList
            blogs={blogs}
            isAdmin={isAdmin}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            formatDate={formatDate}
          />
        )}

        {/* Charts Tab */}
        {activeTab === "charts" && (
          <ChartsTab isPremium={isPremium} isFree={isFree} />
        )}

        {/* Create/Edit Modal */}
        <CreateEditModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          modalType={modalType}
          editingItem={editingItem}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          darkMode={darkMode}
        />

        {/* Welcome Popup */}
        {showWelcomeToast && (
          <WelcomeToast
            username={user?.username}
            onClose={() => setShowWelcomeToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductApp;