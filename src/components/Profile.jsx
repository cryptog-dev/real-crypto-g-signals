import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  FileText,
  Edit3,
  Save,
  X,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { authAPI } from "../utils/api";
import { image } from "framer-motion/client";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await authAPI.getUserInfo();
        console.log("User info:", res.data);
        const userData = {
          ...res.data,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          image: res.data.image,
        };
        setProfileData(userData);
        setEditForm(userData);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    if (user) fetchUserInfo();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Map the form data to the API expected format
      const updateData = {
        first_name: editForm.firstName || "",
        last_name: editForm.lastName || "",
        description: editForm.description || "",
      };

      const response = await authAPI.updateProfile(updateData);

      // Update the local state with the new data, maintaining the camelCase format
      const updatedData = {
        ...editForm,
        firstName: updateData.first_name,
        lastName: updateData.last_name,
        description: updateData.description,
      };

      setProfileData(updatedData);
      setEditForm(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)] pt-20 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lego-card rounded-xl p-4 sm:p-6 border border-[var(--color-border-light)] shadow-md hover:shadow-lg transition-all"
        >
          {/* Top Section: Photo + Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
            {/* Profile Photo */}
            <div className="h-24 w-24 sm:h-20 sm:w-20 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center overflow-hidden">
              {profileData?.profilePhoto ? (
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${profileData.image}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-[var(--color-primary)]" />
              )}
            </div>

            {/* Name + Username */}
            <div className="flex-1 w-full text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="text"
                      name="firstName"
                      value={editForm?.firstName || ""}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="lego-input px-3 py-2 w-full sm:w-1/2 bg-[var(--color-card-bg)] border border-[var(--color-border-light)] rounded-lg focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editForm?.lastName || ""}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="lego-input px-3 py-2 w-full sm:w-1/2 bg-[var(--color-card-bg)] border border-[var(--color-border-light)] rounded-lg focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <p className="text-sm text-contrast-medium font-sans">
                    @{profileData?.username || "trader"}
                  </p>
                  <p className="text-sm text-[var(--color-secondary)] font-medium break-all">
                    {profileData?.email}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] font-[Outfit]">
                    {profileData?.firstName || "First"}{" "}
                    {profileData?.lastName || "Last"}
                  </h2>
                  <p className="text-sm text-contrast-medium font-sans mt-1">
                    @{profileData?.username || "trader"}
                  </p>
                  <p className="text-sm text-[var(--color-secondary)] font-medium mt-1 break-all">
                    {profileData?.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-contrast-high mb-1 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[var(--color-primary)]" />
              About
            </h4>
            {isEditing ? (
              <textarea
                name="description"
                value={editForm?.description || ""}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="lego-input mt-2 w-full px-3 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border-light)] rounded-lg focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] min-h-[100px] resize-y"
                rows={4}
              />
            ) : (
              <p className="text-sm text-contrast-medium font-sans leading-relaxed">
                {profileData?.description || "No description added yet."}
              </p>
            )}
          </div>

          {/* Edit / Save Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`lego-button bg-[var(--color-primary)] text-white px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center space-x-2 w-full sm:w-auto ${
                    saving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[var(--color-primary)]/90"
                  }`}
                >
                  {saving ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError(null);
                    setEditForm(profileData);
                  }}
                  disabled={saving}
                  className={`lego-button bg-[var(--color-card-bg)] border border-[var(--color-border-light)] px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center space-x-2 hover:border-[var(--color-border-hover)] w-full sm:w-auto ${
                    saving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="lego-button bg-[var(--color-secondary)] text-white px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
