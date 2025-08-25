import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
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
import {
  Home,
  Signal,
  BookOpen,
  BarChart,
} from "lucide-react";
import { blogsAPI, signalsAPI } from "./utils/api";

const ProductApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const { user, isAdmin, isPremium } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  const isFree = () => !isAdmin() && !isPremium();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    coin: "",
    direction: "long",
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
      const [blogsResponse, signalsResponse] = await Promise.all([
        blogsAPI.getAll(),
        signalsAPI.getAll(),
      ]);
      setBlogs(blogsResponse.data);
      setSignals(signalsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      direction: "long",
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
      direction: item.direction || "long",
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
    if (window.confirm("Are you sure you want to delete this item?")) {
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
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      case "fail":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>

      <Navbar isAppView={true} activeTab={activeTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-26 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800 dark:text-gray-100">
              Welcome back,{" "}
            </span>
            <span className="text-green-600 dark:text-green-400">
              {user?.username}
            </span>
            <span className="text-amber-500 dark:text-amber-400">!</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access your personalized crypto trading dashboard with real-time
            signals and market analysis.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <nav className="flex justify-center space-x-8">
            {[
              { id: "dashboard", name: "Dashboard", icon: Home },
              { id: "signals", name: "Trading Signals", icon: Signal },
              { id: "blogs", name: "Market Analysis", icon: BookOpen },
              { id: "charts", name: "Charts", icon: BarChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <DashboardStats signals={signals} blogs={blogs} />
            {isAdmin() && <AdminControls handleCreate={handleCreate} />}
            {!isAdmin() && <UserFeatures />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RecentSignals signals={signals} getStatusColor={getStatusColor} formatDate={formatDate} />
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
        {activeTab === "charts" && <ChartsTab />}

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

      </div>
    </div>
  );
};

export default ProductApp;
