import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, FileText, Edit3, Save, X } from "lucide-react";
import { authAPI } from "../utils/api";

const Profile = () => {
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await authAPI.getUserInfo();
        setProfileData(res.data);
        setEditForm(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    if (user) fetchUserInfo();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: integrate save API
    setProfileData(editForm);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)] pt-20 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lego-card rounded-xl p-6 border border-[var(--color-border-light)] shadow-md hover:shadow-lg transition-all"
        >
          {/* Top Section: Photo + Basic Info */}
          <div className="flex items-center space-x-6">
            {/* Profile Photo */}
            <div className="h-20 w-20 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center overflow-hidden">
              {profileData?.profilePhoto ? (
                <img
                  src={profileData.img}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-[var(--color-primary)]" />
              )}
            </div>

            {/* Name + Username */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] font-[Outfit]">
                {profileData?.firstName || "First"} {profileData?.lastName || "Last"}
              </h2>
              <p className="text-sm text-contrast-medium font-sans mt-1">
                @{profileData?.username || "trader"}
              </p>
              <p className="text-sm text-[var(--color-secondary)] font-medium mt-1">
                {profileData?.email}
              </p>
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
                className="lego-input mt-2 w-full"
                rows={4}
              />
            ) : (
              <p className="text-sm text-contrast-medium font-sans leading-relaxed">
                {profileData?.description || "No description added yet."}
              </p>
            )}
          </div>

          {/* Edit / Save Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="lego-button bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="lego-button bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="lego-button bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg flex items-center space-x-2"
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
