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
      hour: "2-digit",
      minute: "2-digit",
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

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You need admin privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading admin panel...
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
            <span className="text-gray-800 dark:text-gray-100">Admin </span>
            <span className="text-green-600 dark:text-green-400">Control</span>
            <span className="text-amber-500 dark:text-amber-400"> Panel</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Manage your crypto trading platform with powerful tools and
            comprehensive analytics.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <nav className="flex justify-center space-x-8">
            {[
              { id: "dashboard", name: "Dashboard", icon: BarChart3 },
              { id: "blogs", name: "Blogs", icon: FileText },
              { id: "signals", name: "Signals", icon: TrendingUp },
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <FileText className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Blogs
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {blogs.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Signals
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {signals.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                    <BarChart3 className="text-white" size={28} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Signals
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {signals.filter((s) => s.status === "pending").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleCreate("blog")}
                  className="flex items-center justify-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all hover:shadow-md"
                >
                  <Plus size={18} />
                  <span>Create New Blog</span>
                </button>
                <button
                  onClick={() => handleCreate("signal")}
                  className="flex items-center justify-center space-x-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all hover:shadow-md"
                >
                  <Plus size={18} />
                  <span>Create New Signal</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Signals */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Recent Trading Signals
                  </h3>
                </div>
                <div className="space-y-4">
                  {signals.slice(0, 5).map((signal) => (
                    <div
                      key={signal.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            signal.direction === "long"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {signal.coin}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${signal.entry_price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            signal.status
                          )}`}
                        >
                          {signal.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(signal.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {signals.length === 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No recent signals
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Blogs */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Recent Market Analysis
                  </h3>
                </div>
                <div className="space-y-4">
                  {blogs.slice(0, 3).map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {blog.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          {blog.content.substring(0, 60)}...
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(blog.created_at)}
                      </span>
                    </div>
                  ))}
                  {blogs.length === 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Blog Management
              </h2>
              <button
                onClick={() => handleCreate("blog")}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
              >
                <Plus size={20} className="mr-2" />
                Create Blog
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        By {blog.author?.username || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(blog.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(blog, "blog")}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit Blog"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, "blog")}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Blog"
                    >
                      <Trash2 size={18} />
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
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Signal Management
              </h2>
              <button
                onClick={() => handleCreate("signal")}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
              >
                <Plus size={20} className="mr-2" />
                Create Signal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signals.map((signal) => (
                <div
                  key={signal.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {signal.coin}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            signal.direction === "long"
                              ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                              : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {signal.direction}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Entry Price:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              ${signal.entry_price?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Leverage:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {signal.leverage || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Status:
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                signal.status
                              )}`}
                            >
                              {signal.status}
                            </span>
                          </div>
                        </div>
                        
                        {signal.targets && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                              Targets
                            </h4>
                            <div className="space-y-2">
                              {Object.entries(JSON.parse(signal.targets)).map(([price, status]) => (
                                <div key={price} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600 dark:text-gray-300">
                                    ${parseFloat(price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                  </span>
                                  <span 
                                    className={`px-2 py-0.5 rounded-full text-xs ${
                                      status === 'hit' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                        : status === 'fail' 
                                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(signal.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(signal, "signal")}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit Signal"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(signal.id, "signal")}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Signal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`relative w-full max-w-2xl ${
              darkMode ? "bg-gray-800/95" : "bg-white/95"
            } backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700`}
          >
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {editingItem ? "Edit" : "Create"}{" "}
                {modalType === "blog" ? "Blog" : "Signal"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {editingItem
                  ? "Update the details below"
                  : "Fill in the details below"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {modalType === "blog" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Image URL (optional)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Coin
                      </label>
                      <input
                        type="text"
                        value={formData.coin}
                        onChange={(e) =>
                          setFormData({ ...formData, coin: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Direction
                      </label>
                      <select
                        value={formData.direction}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            direction: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      >
                        <option value="long">Long</option>
                        <option value="short">Short</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Entry Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.entry_price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entry_price: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Leverage
                      </label>
                      <input
                        type="number"
                        value={formData.leverage}
                        onChange={(e) =>
                          setFormData({ ...formData, leverage: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Stop Loss
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.stop_loss}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stop_loss: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="fail">Fail</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Targets (JSON format)
                    </label>
                    <textarea
                      value={formData.targets}
                      onChange={(e) =>
                        setFormData({ ...formData, targets: e.target.value })
                      }
                      rows={3}
                      placeholder='{"45000": "pending", "47000": "success"}'
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
                >
                  <Save size={18} className="mr-2" />
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
