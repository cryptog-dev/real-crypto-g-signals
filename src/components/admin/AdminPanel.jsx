import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import Navbar from "../Navbar";
import AdminStats from "./AdminStats";
import AdminQuickActions from "./AdminQuickActions";
import AdminRecentActivity from "./AdminRecentActivity";
import AdminBlogManagement from "./AdminBlogManagement";
import AdminSignalManagement from "./AdminSignalManagement";
import CreateEditModal from "../CreateEditModal";
import { blogsAPI, signalsAPI } from "../../utils/api";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../ui/LoadingSpinner";
import { formatDate } from "../../utils/formatters";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [signals, setSignals] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState("blog");
  const [editingItem, setEditingItem] = useState(null);
  const { user, logout, isAdmin } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const { loading, error, execute } = useApi();

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
    const { data: blogsData } = await execute(() => blogsAPI.getAll());
    const { data: signalsData } = await execute(() => signalsAPI.getAll());
    
    if (blogsData) setBlogs(blogsData);
    if (signalsData) setSignals(signalsData);
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
      if (type === "blog") {
        const { error } = await execute(() => blogsAPI.delete(id));
        if (!error) {
          setBlogs(blogs.filter((blog) => blog.id !== id));
        }
      } else {
        const { error } = await execute(() => signalsAPI.delete(id));
        if (!error) {
          setSignals(signals.filter((signal) => signal.id !== id));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === "blog") {
      const blogData = {
        title: formData.title,
        content: formData.content,
        image: formData.image,
      };

      if (editingItem) {
        const { data, error } = await execute(() => blogsAPI.update(editingItem.id, blogData));
        if (!error) {
          setBlogs(blogs.map((blog) =>
            blog.id === editingItem.id ? { ...blog, ...blogData } : blog
          ));
        }
      } else {
        const { data, error } = await execute(() => blogsAPI.create(blogData));
        if (!error && data) {
          setBlogs([...blogs, data]);
        }
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
        const { data, error } = await execute(() => signalsAPI.update(editingItem.id, signalData));
        if (!error) {
          setSignals(signals.map((signal) =>
            signal.id === editingItem.id ? { ...signal, ...signalData } : signal
          ));
        }
      } else {
        const { data, error } = await execute(() => signalsAPI.create(signalData));
        if (!error && data) {
          setSignals([...signals, data]);
        }
      }
    }
    
    if (!error) {
      setShowCreateModal(false);
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
          <LoadingSpinner size="lg" />
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
              { id: "dashboard", name: "Dashboard" },
              { id: "blogs", name: "Blogs" },
              { id: "signals", name: "Signals" },
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
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <AdminStats blogs={blogs} signals={signals} />
            <AdminQuickActions handleCreate={handleCreate} />
            <AdminRecentActivity blogs={blogs} signals={signals} formatDate={formatDate} />
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <AdminBlogManagement
            blogs={blogs}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            formatDate={formatDate}
          />
        )}

        {/* Signals Tab */}
        {activeTab === "signals" && (
          <AdminSignalManagement
            signals={signals}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            formatDate={formatDate}
          />
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

export default AdminPanel;