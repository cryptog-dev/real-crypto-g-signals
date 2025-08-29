import React, { useState, useEffect, useContext, useCallback } from "react";
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
import { Home, Signal, BookOpen, BarChart } from "lucide-react";
import { blogsAPI, signalsAPI } from "./utils/api";

// Define tab configuration outside the component for better readability and reusability
const TAB_CONFIG = [
  { id: "dashboard", name: "Home", icon: Home },
  { id: "signals", name: "Signals", icon: Signal },
  { id: "blogs", name: "Analysis", icon: BookOpen },
  { id: "charts", name: "Charts", icon: BarChart },
];

// Define status colors as a constant for reusability and consistency
const STATUS_COLORS = {
  success: "text-[#48BB78] bg-[#48BB78]/10 dark:bg-[#48BB78]/20",
  fail: "text-[#F56565] bg-[#F56565]/10 dark:bg-[#F56565]/20",
  pending: "text-[#FFD700] bg-[#FFD700]/10 dark:bg-[#FFD700]/20",
  default: "text-[#2D3748] bg-[#F7FAFC] dark:bg-[#2D3748]/50 dark:text-[#F7FAFC]",
};

const DEFAULT_FORM_DATA = {
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
};

const ProductApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const { user, isAdmin, isPremium } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  // Memoize the isFree check to avoid recalculating on every render
  const isFree = !isAdmin() && !isPremium();

  // Fetch data with useCallback to avoid recreating the function on every render
  const fetchData = useCallback(async () => {
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
      // Optionally, show a user-friendly error message here
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle nav tab change with useCallback
  useEffect(() => {
    const handleNavTabChange = (event) => {
      const tabName = event.detail;
      if (TAB_CONFIG.some(tab => tab.id === tabName)) {
        setActiveTab(tabName);
      }
    };
    window.addEventListener("navTabChange", handleNavTabChange);
    return () => window.removeEventListener("navTabChange", handleNavTabChange);
  }, []);

  // Reset form data to default values
  const resetFormData = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
  }, []);

  const handleCreate = useCallback((type) => {
    setModalType(type);
    setEditingItem(null);
    resetFormData();
    setShowCreateModal(true);
  }, [resetFormData]);

  const handleEdit = useCallback((item, type) => {
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
      targets: typeof item.targets === "string" ? item.targets : JSON.stringify(item.targets || {}),
      status: item.status || "pending",
    });
    setShowCreateModal(true);
  }, []);

  const handleDelete = useCallback(async (id, type) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        if (type === "blog") {
          await blogsAPI.delete(id);
          setBlogs(prev => prev.filter(blog => blog.id !== id));
        } else {
          await signalsAPI.delete(id);
          setSignals(prev => prev.filter(signal => signal.id !== id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        // Optionally, show a user-friendly error message here
      }
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (modalType === "blog") {
        const blogData = {
          title: formData.title,
          content: formData.content,
          image: formData.image,
        };
        if (editingItem) {
          const response = await blogsAPI.update(editingItem.id, blogData);
          setBlogs(prev => prev.map(blog =>
            blog.id === editingItem.id ? { ...blog, ...response.data } : blog
          ));
        } else {
          const response = await blogsAPI.create(blogData);
          setBlogs(prev => [...prev, response.data]);
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
          const response = await signalsAPI.update(editingItem.id, signalData);
          setSignals(prev => prev.map(signal =>
            signal.id === editingItem.id ? { ...signal, ...response.data } : signal
          ));
        } else {
          const response = await signalsAPI.create(signalData);
          setSignals(prev => [...prev, response.data]);
        }
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Error saving item:", error);
      // Optionally, show a user-friendly error message here
    }
  }, [modalType, formData, editingItem]);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.default;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] dark:bg-[#2D3748] flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4332] dark:border-[#FFD700] mx-auto"></div>
          <p className="mt-4 text-[#2D3748] dark:text-[#F7FAFC] font-sans text-lg">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#F7E7CE]/30 to-[#FFFFFF] dark:from-[#2D3748] dark:via-[#1B4332]/30 dark:to-[#2D3748] relative overflow-hidden font-sans">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#1B4332]/10 dark:bg-[#FFD700]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FFD700]/10 dark:bg-[#1B4332]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#F7E7CE]/10 dark:bg-[#F7E7CE]/5 rounded-full blur-3xl"></div>

      <Navbar isAppView={true} activeTab={activeTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-26 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
            <span className="text-[#2D3748] dark:text-[#F7FAFC]">
              Welcome back,{" "}
            </span>
            <span className="text-[#1B4332] dark:text-[#FFD700]">
              {user?.username}
            </span>
            <span className="text-[#FFD700] dark:text-[#F7E7CE]">!</span>
          </h1>
          <p className="text-xl text-[#2D3748]/80 dark:text-[#F7FAFC]/80 max-w-3xl mx-auto font-sans leading-relaxed">
            Access your personalized crypto trading dashboard with real-time signals and market analysis.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 md:mb-12 px-2 md:px-0">
          <div className="overflow-x-auto pb-2">
            <nav className="flex space-x-2 md:space-x-4 px-2 md:px-0 w-max max-w-full mx-auto">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center space-x-1 md:space-x-2 px-4 py-2.5 rounded-lg text-base font-medium font-heading transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 text-[#F7FAFC] shadow-lg border border-[#FFD700]/20"
                      : "text-[#2D3748] dark:text-[#F7FAFC] hover:text-[#1B4332] dark:hover:text-[#FFD700] bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 hover:bg-[#F7FAFC] dark:hover:bg-[#2D3748] backdrop-blur-sm border border-[#F7E7CE]/20 hover:border-[#FFD700]/30"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="whitespace-nowrap">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <DashboardStats signals={signals} blogs={blogs} />
            {isAdmin ? (
              <div className="px-2 md:px-0">
                <AdminControls handleCreate={handleCreate} />
              </div>
            ) : (
              <div className="px-2 md:px-0">
                <UserFeatures />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-0">
              <div className="w-full rounded-lg bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm border border-[#F7E7CE]/20 shadow-sm">
                <RecentSignals
                  signals={signals}
                  getStatusColor={getStatusColor}
                  formatDate={formatDate}
                />
              </div>
              <div className="w-full rounded-lg bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm border border-[#F7E7CE]/20 shadow-sm">
                <RecentBlogs
                  blogs={blogs}
                  formatDate={formatDate}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "signals" && (
          <div className="rounded-lg bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm border border-[#F7E7CE]/20 shadow-sm p-6">
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
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="rounded-lg bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm border border-[#F7E7CE]/20 shadow-sm p-6">
            <BlogsList
              blogs={blogs}
              isAdmin={isAdmin}
              handleCreate={handleCreate}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              formatDate={formatDate}
            />
          </div>
        )}

        {activeTab === "charts" && (
          <div className="rounded-lg bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm border border-[#F7E7CE]/20 shadow-sm p-6">
            <ChartsTab />
          </div>
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
      </div>
    </div>
  );
};

export default ProductApp;
