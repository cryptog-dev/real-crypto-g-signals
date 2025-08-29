import React, { useState, useEffect, useContext } from "react";
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  FileText,
  BarChart3,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import { blogsAPI, signalsAPI } from "../utils/api";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const { user, logout, isAdmin } = useAuth();
  const { darkMode } = useContext(ThemeContext);

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
    if (isAdmin()) {
      fetchData();
    }
  }, [isAdmin]);

  useEffect(() => {
    const handleNavTabChange = (event) => {
      const tabName = event.detail;
      if (["dashboard", "blogs", "signals"].includes(tabName)) {
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
              signal.id === editingItem.id ? { ...signal, ...signalData } : signal
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-[#48BB78] bg-[#48BB78]/10 dark:bg-[#48BB78]/20 dark:text-[#48BB78]";
      case "fail":
        return "text-[#F56565] bg-[#F56565]/10 dark:bg-[#F56565]/20 dark:text-[#F56565]";
      case "pending":
        return "text-[#FFD700] bg-[#FFD700]/10 dark:bg-[#FFD700]/20 dark:text-[#FFD700]";
      default:
        return "text-[#2D3748]/80 bg-[#2D3748]/10 dark:bg-[#2D3748]/20 dark:text-[#F7FAFC]/80";
    }
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#F7E7CE]/30 to-[#FFFFFF] dark:from-[#2D3748] dark:via-[#1B4332]/30 dark:to-[#2D3748] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2D3748] dark:text-[#F7FAFC] mb-4 font-heading">
            Access Denied
          </h1>
          <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
            You need admin privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#F7E7CE]/30 to-[#FFFFFF] dark:from-[#2D3748] dark:via-[#1B4332]/30 dark:to-[#2D3748] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4332] dark:border-[#FFD700] mx-auto"></div>
          <p className="mt-4 text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#F7E7CE]/30 to-[#FFFFFF] dark:from-[#2D3748] dark:via-[#1B4332]/30 dark:to-[#2D3748] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#48BB78]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#1B4332]/10 rounded-full blur-3xl"></div>

      <Navbar isAppView={true} activeTab={activeTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 relative z-10 font-sans">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] dark:text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight">
            Admin Control Panel
          </h1>
          <p className="text-lg text-[#2D3748]/80 dark:text-[#F7FAFC]/80 max-w-3xl mx-auto mt-2 font-sans leading-relaxed">
            Manage your crypto trading platform with powerful tools and comprehensive analytics.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-10">
          <nav className="flex justify-center space-x-6">
            {[
              { id: "dashboard", name: "Dashboard", icon: BarChart3 },
              { id: "blogs", name: "Blogs", icon: FileText },
              { id: "signals", name: "Signals", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-sm font-medium font-heading transition-all duration-300 hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 text-[#F7FAFC] shadow-md"
                    : "text-[#2D3748]/80 dark:text-[#F7FAFC]/80 hover:text-[#1B4332] dark:hover:text-[#FFD700] hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/80 rounded-lg">
                    <FileText className="text-[#F7FAFC] h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                      Total Blogs
                    </p>
                    <p className="text-xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                      {blogs.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/80 rounded-lg">
                    <TrendingUp className="text-[#F7FAFC] h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                      Total Signals
                    </p>
                    <p className="text-xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                      {signals.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/80 rounded-lg">
                    <BarChart3 className="text-[#F7FAFC] h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                      Active Signals
                    </p>
                    <p className="text-xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                      {signals.filter((s) => s.status === "pending").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300">
              <h3 className="text-xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-heading mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleCreate("blog")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Blog</span>
                </button>
                <button
                  onClick={() => handleCreate("signal")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Signal</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Signals */}
              <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                    Recent Trading Signals
                  </h3>
                </div>
                <div className="space-y-3">
                  {signals.slice(0, 5).map((signal) => (
                    <div
                      key={signal.id}
                      className="flex items-center justify-between p-2 bg-[#F7E7CE]/10 dark:bg-[#1B4332]/10 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            signal.direction === "long" ? "bg-[#48BB78]" : "bg-[#F56565]"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                            {signal.coin}
                          </p>
                          <p className="text-xs text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                            ${signal.entry_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}
                        >
                          {signal.status}
                        </span>
                        <span className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 font-sans">
                          {formatDate(signal.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {signals.length === 0 && (
                    <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                      No recent signals
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Blogs */}
              <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                    Recent Market Analysis
                  </h3>
                </div>
                <div className="space-y-3">
                  {blogs.slice(0, 3).map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center space-x-3 p-2 bg-[#F7E7CE]/10 dark:bg-[#1B4332]/10 rounded-lg"
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-12 h-12 object-cover rounded-lg border border-[#F7E7CE]/20"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#2D3748] dark:text-[#F7FAFC] font-heading line-clamp-1">
                          {blog.title}
                        </p>
                        <p className="text-xs text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans line-clamp-1">
                          {blog.content.substring(0, 60)}...
                        </p>
                      </div>
                      <span className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 font-sans">
                        {formatDate(blog.created_at)}
                      </span>
                    </div>
                  ))}
                  {blogs.length === 0 && (
                    <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                      No recent blogs
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                Blog Management
              </h2>
              <button
                onClick={() => handleCreate("blog")}
                className="flex items-center px-5 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#F7FAFC] font-heading mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans mb-3">
                        By {blog.author?.username || "Anonymous"}
                      </p>
                      <p className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 font-sans">
                        {formatDate(blog.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#F7E7CE]/20">
                    <button
                      onClick={() => handleEdit(blog, "blog")}
                      className="p-2 text-[#1B4332] dark:text-[#FFD700] hover:text-[#48BB78] dark:hover:text-[#48BB78] hover:bg-[#48BB78]/10 dark:hover:bg-[#48BB78]/10 rounded-lg transition-all duration-200"
                      title="Edit Blog"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, "blog")}
                      className="p-2 text-[#1B4332] dark:text-[#FFD700] hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg transition-all duration-200"
                      title="Delete Blog"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signals Tab */}
        {activeTab === "signals" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                Signal Management
              </h2>
              <button
                onClick={() => handleCreate("signal")}
                className="flex items-center px-5 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Signal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signals.map((signal) => (
                <div
                  key={signal.id}
                  className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                          {signal.coin}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium font-sans ${
                            signal.direction === "long"
                              ? "text-[#48BB78] bg-[#48BB78]/10 dark:bg-[#48BB78]/20"
                              : "text-[#F56565] bg-[#F56565]/10 dark:bg-[#F56565]/20"
                          }`}
                        >
                          {signal.direction}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                            Entry Price:
                          </span>
                          <span className="text-sm font-medium text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                            ${signal.entry_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                            Leverage:
                          </span>
                          <span className="text-sm font-medium text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                            {signal.leverage || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                            Status:
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium font-sans ${getStatusColor(signal.status)}`}
                          >
                            {signal.status}
                          </span>
                        </div>
                      </div>

                      {signal.targets && (
                        <div className="mt-3 pt-3 border-t border-[#F7E7CE]/20">
                          <h4 className="text-xs font-semibold text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans uppercase tracking-wider mb-2">
                            Targets
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(JSON.parse(signal.targets)).map(([price, status]) => (
                              <div key={price} className="flex justify-between items-center text-sm">
                                <span className="text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-mono">
                                  ${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium font-sans ${
                                    status === "hit"
                                      ? "bg-[#48BB78]/10 text-[#48BB78] dark:bg-[#48BB78]/20 dark:text-[#48BB78]"
                                      : status === "fail"
                                      ? "bg-[#F56565]/10 text-[#F56565] dark:bg-[#F56565]/20 dark:text-[#F56565]"
                                      : "bg-[#F7E7CE]/10 text-[#2D3748]/80 dark:bg-[#1B4332]/20 dark:text-[#F7FAFC]/80"
                                  }`}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 font-sans mt-3">
                        {formatDate(signal.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#F7E7CE]/20">
                    <button
                      onClick={() => handleEdit(signal, "signal")}
                      className="p-2 text-[#1B4332] dark:text-[#FFD700] hover:text-[#48BB78] dark:hover:text-[#48BB78] hover:bg-[#48BB78]/10 dark:hover:bg-[#48BB78]/10 rounded-lg transition-all duration-200"
                      title="Edit Signal"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(signal.id, "signal")}
                      className="p-2 text-[#1B4332] dark:text-[#FFD700] hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg transition-all duration-200"
                      title="Delete Signal"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-[100] p-4 overflow-y-auto pt-20">
            <div
              className="relative w-full max-w-3xl bg-[#2D3748]/95 dark:bg-[#1B4332]/95 rounded-2xl shadow-lg border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-8 max-h-[calc(100vh-6rem)] overflow-y-auto transition-all duration-300 font-sans"
            >
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 p-2 text-[#F7FAFC]/80 hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-full transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight flex items-center justify-center gap-2">
                  {editingItem ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {editingItem ? "Edit" : "Create"} {modalType === "blog" ? "Blog" : "Signal"}
                </h2>
                <p className="text-base text-[#F7FAFC]/80 mt-2 font-sans leading-relaxed">
                  {editingItem ? "Update the details below" : "Fill in the details below"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {modalType === "blog" ? (
                  <>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <FileText className="h-4 w-4 text-[#FFD700]" /> Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <FileText className="h-4 w-4 text-[#FFD700]" /> Content
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <FileText className="h-4 w-4 text-[#FFD700]" /> Image URL (optional)
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <TrendingUp className="h-4 w-4 text-[#FFD700]" /> Coin
                      </label>
                      <input
                        type="text"
                        value={formData.coin}
                        onChange={(e) => setFormData({ ...formData, coin: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        {formData.direction === "long" ? (
                          <TrendingUp className="h-4 w-4 text-[#48BB78]" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-[#F56565]" />
                        )}
                        Direction
                      </label>
                      <select
                        value={formData.direction}
                        onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                      >
                        <option value="long">Long</option>
                        <option value="short">Short</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <TrendingUp className="h-4 w-4 text-[#FFD700]" /> Entry Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.entry_price}
                        onChange={(e) => setFormData({ ...formData, entry_price: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <TrendingUp className="h-4 w-4 text-[#FFD700]" /> Leverage
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="125"
                          step="1"
                          value={formData.leverage || 1}
                          onChange={(e) => setFormData({ ...formData, leverage: Number(e.target.value) })}
                          className="w-full accent-[#1B4332] dark:accent-[#FFD700]"
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="125"
                            value={formData.leverage || 1}
                            onChange={(e) => {
                              let val = Math.max(1, Math.min(125, Number(e.target.value) || 1));
                              setFormData({ ...formData, leverage: val });
                            }}
                            className="w-20 px-3 py-2 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332] dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] font-mono"
                          />
                          <span className="font-semibold text-[#F7FAFC]/80 font-mono">x</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-[#F7FAFC]/60 mt-1 font-mono">
                        <span>1x</span>
                        <span>125x</span>
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <TrendingUp className="h-4 w-4 text-[#F56565]" /> Stop Loss
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.stop_loss}
                        onChange={(e) => setFormData({ ...formData, stop_loss: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        <TrendingUp className="h-4 w-4 text-[#48BB78]" /> Targets (JSON format)
                      </label>
                      <textarea
                        value={formData.targets}
                        onChange={(e) => setFormData({ ...formData, targets: e.target.value })}
                        rows={3}
                        placeholder='{"45000": "pending", "47000": "success"}'
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]/80 mb-2 font-sans">
                        {formData.status === "success" ? (
                          <TrendingUp className="h-4 w-4 text-[#48BB78]" />
                        ) : formData.status === "fail" ? (
                          <TrendingUp className="h-4 w-4 text-[#F56565]" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-[#FFD700]" />
                        )}
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono"
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="fail">Fail</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 text-[#F7FAFC]/80 hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg font-medium font-heading text-sm transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;