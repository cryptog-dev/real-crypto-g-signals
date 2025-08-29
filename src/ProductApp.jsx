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
import { Home, Signal, BookOpen, BarChart, TrendingUp, Activity, Zap } from "lucide-react";
import { blogsAPI, signalsAPI } from "./utils/api";

const ProductApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const { user, isAdmin, isPremium } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  const isFree = () => !isAdmin() && !isPremium();

  const [formData, setFormData] = useState({
    title: "", content: "", image: "", coin: "", direction: "buy",
    entry_price: "", leverage: "", stop_loss: "", targets: "", status: "pending",
  });

  useEffect(() => {
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
    fetchData();
  }, []);

  useEffect(() => {
    const handleNavTabChange = (event) => {
      const tabName = event.detail;
      if (["dashboard", "signals", "blogs", "charts"].includes(tabName)) {
        handleTabChange(tabName);
      }
    };
    window.addEventListener("navTabChange", handleNavTabChange);
    return () => window.removeEventListener("navTabChange", handleNavTabChange);
  }, []);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setIsTabTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTabTransitioning(false);
    }, 150);
  };

  const handleCreate = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({
      title: "", content: "", image: "", coin: "", direction: "buy",
      entry_price: "", leverage: "", stop_loss: "", targets: "", status: "pending",
    });
    setShowCreateModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setEditingItem(item);
    setFormData({
      title: item.title || "", content: item.content || "", image: item.image || "",
      coin: item.coin || "", direction: item.direction || "buy", entry_price: item.entry_price || "",
      leverage: item.leverage || "", stop_loss: item.stop_loss || "",
      targets: typeof item.targets === "string" ? item.targets : JSON.stringify(item.targets || {}),
      status: item.status || "pending",
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = modalType === "blog"
        ? { title: formData.title, content: formData.content, image: formData.image }
        : {
            coin: formData.coin, direction: formData.direction, entry_price: parseFloat(formData.entry_price),
            leverage: parseInt(formData.leverage), stop_loss: parseFloat(formData.stop_loss),
            targets: formData.targets, status: formData.status,
          };

      if (editingItem) {
        if (modalType === "blog") {
          await blogsAPI.update(editingItem.id, data);
          setBlogs(blogs.map((blog) => (blog.id === editingItem.id ? { ...blog, ...data } : blog)));
        } else {
          await signalsAPI.update(editingItem.id, data);
          setSignals(signals.map((signal) => (signal.id === editingItem.id ? { ...signal, ...data } : signal)));
        }
      } else {
        const response = modalType === "blog" ? await blogsAPI.create(data) : await signalsAPI.create(data);
        modalType === "blog" ? setBlogs([...blogs, response.data]) : setSignals([...signals, response.data]);
      }
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const getStatusColor = (status) => {
    const colors = {
      success: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400",
      fail: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400",
      pending: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400",
    };
    return colors[status] || "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
  };

  const getTabConfig = () => [
    { id: "dashboard", name: "Dashboard", displayName: "Home", icon: Home, gradient: "from-blue-500 to-indigo-600" },
    { id: "signals", name: "Signals", displayName: "Signals", icon: Signal, gradient: "from-green-500 to-emerald-600" },
    { id: "blogs", name: "Analysis", displayName: "Analysis", icon: BookOpen, gradient: "from-purple-500 to-violet-600" },
    { id: "charts", name: "Charts", displayName: "Charts", icon: BarChart, gradient: "from-orange-500 to-red-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500/20 border-t-green-500 mx-auto"></div>
            <TrendingUp className="absolute inset-0 m-auto h-6 w-6 text-green-500 animate-pulse" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Loading Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center mt-2">
            <Activity className="mr-2 h-4 w-4 animate-pulse" /> Fetching data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar isAppView={true} activeTab={activeTab} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="text-center mb-8">
          <div className="relative bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-md">
            <h1 className="text-3xl font-bold mb-4">
              Welcome, <span className="text-green-600">{user?.username}</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Your crypto trading dashboard with real-time signals.</p>
          </div>
        </div>

        <nav className="flex space-x-2 mb-8 overflow-x-auto">
          {getTabConfig().map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md`
                  : "text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.displayName}</span>
            </button>
          ))}
        </nav>

        <div className={`transition-opacity duration-300 ${isTabTransitioning ? "opacity-0" : "opacity-100"}`}>
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <DashboardStats signals={signals} blogs={blogs} />
              {isAdmin() ? <AdminControls handleCreate={handleCreate} /> : <UserFeatures />}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentSignals signals={signals} getStatusColor={getStatusColor} formatDate={formatDate} />
                <RecentBlogs blogs={blogs} formatDate={formatDate} />
              </div>
            </div>
          )}
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
          {activeTab === "charts" && <ChartsTab />}
        </div>

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