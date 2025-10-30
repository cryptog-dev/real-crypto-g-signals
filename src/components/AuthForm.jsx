import React, { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { GOOGLE_CLIENT_ID } from "../constants";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo2 from "../assets/logo2.png";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const { login, register, loginWithGoogle } = useAuth();
  const { themeName } = useContext(ThemeContext);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    const existing = document.getElementById("google-identity-services");
    const ensureRender = () => {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            const credential = response?.credential;
            if (!credential) return;
            setError("");
            setSuccess("");
            setGoogleLoading(true);
            try {
              const result = await loginWithGoogle(credential);
              if (!result.success) {
                setError(result.error || "Google login failed");
              } else {
                setSuccess("Login successful! Redirecting...");
              }
            } catch {
              setError("Google login failed");
            } finally {
              setGoogleLoading(false);
            }
          },
          ux_mode: "popup",
          auto_select: false,
        });
        if (googleBtnRef.current) {
          while (googleBtnRef.current.firstChild) googleBtnRef.current.removeChild(googleBtnRef.current.firstChild);
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: 320,
            type: isLogin ? "standard" : "standard",
            text: isLogin ? "signin_with" : "signup_with",
            shape: "rectangular",
            logo_alignment: "left",
          });
        }
      } catch {
        void 0;
      }
    };

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-identity-services";
      script.onload = ensureRender;
      document.body.appendChild(script);
    } else {
      ensureRender();
    }
  }, [isLogin, loginWithGoogle]);

  const handleGoogleClick = () => {
    setError("");
    setSuccess("");
    if (window.google && window.google.accounts && window.google.accounts.id) {
      setGoogleLoading(true);
      let clicked = false;
      try {
        const innerBtn =
          googleBtnRef.current?.querySelector('div[role="button"]') ||
          googleBtnRef.current?.firstChild;
        if (innerBtn && typeof innerBtn.click === "function") {
          innerBtn.click();
          clicked = true;
        }
      } catch {
        // ignore
      }
      if (!clicked) {
        try {
          window.google.accounts.id.prompt();
        } catch {
          setGoogleLoading(false);
          setError("Google is unavailable. Try again later.");
        }
      }
    } else {
      setError("Google is unavailable. Try again later.");
    }
  };

  // Check password strength and update state
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (!password) return 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[0-9]/.test(password)) strength += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special chars
    return Math.min(strength, 5);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!isLogin) {
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else {
      if (!formData.password) {
        errors.password = "Password is required";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
    if (name === "password" && !isLogin) {
      setPasswordStrength(checkPasswordStrength(value));
    }
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (isLogin) {
        const result = await login({
          username: formData.username.trim(),
          password: formData.password,
        });
        if (!result.success) {
          setError(result.error || "Invalid username or password");
        } else {
          setSuccess("Login successful! Redirecting...");
        }
      } else {
        const result = await register({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
        if (!result.success) {
          setError(result.error || "Registration failed. Please try again.");
        } else {
          setSuccess("Registration successful! Logging you in...");
          const loginResult = await login({
            username: formData.username.trim(),
            password: formData.password,
          });
          if (!loginResult.success) {
            setError("Registration successful! Please log in.");
            setIsLogin(true);
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <Loader2 className="animate-spin h-12 w-12 text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <main className="flex-grow flex items-start md:items-center justify-center p-4 overflow-y-auto">
        <motion.div
          className="w-full max-w-md mx-auto my-4 md:my-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="lego-card p-6 md:p-8 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-300"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src={Logo2}
                  alt="CryptoG Signals"
                  className="mx-auto mb-4 h-26 w-auto object-contain"
                />
                <p className="text-contrast-medium text-sm font-sans">
                  {isLogin
                    ? `Sign in to access ${themeName} trading tools`
                    : "Create an account to start trading smarter"}
                </p>
              </motion.div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-[var(--color-negative)]/10 border-l-4 border-[var(--color-negative)] rounded-r-md flex items-start text-[var(--color-negative)] font-sans"
                >
                  <AlertCircle className="flex-shrink-0 h-5 w-5 mr-2 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-[var(--color-positive)]/10 border-l-4 border-[var(--color-positive)] rounded-r-md flex items-start text-[var(--color-positive)] font-sans"
                >
                  <Check className="flex-shrink-0 h-5 w-5 mr-2 mt-0.5" />
                  <span className="text-sm">{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label
                  htmlFor="username"
                  className={`block text-sm font-medium mb-1.5 ${
                    formErrors.username
                      ? "text-[var(--color-negative)]"
                      : "text-contrast-high"
                  } font-sans`}
                >
                  Username {formErrors.username && `- ${formErrors.username}`}
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      formErrors.username
                        ? "text-[var(--color-negative)]"
                        : "text-contrast-medium"
                    }`}
                    size={18}
                  />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 text-sm border ${
                      formErrors.username
                        ? "border-[var(--color-negative)] focus:ring-[var(--color-negative)]"
                        : "border-[var(--color-border-light)] focus:ring-[var(--color-primary)] hover:border-[var(--color-border-hover)]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200`}
                    required
                    disabled={loading}
                    placeholder="Enter your username"
                    aria-invalid={!!formErrors.username}
                    aria-describedby={
                      formErrors.username ? "username-error" : undefined
                    }
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1.5 ${
                      formErrors.email
                        ? "text-[var(--color-negative)]"
                        : "text-contrast-high"
                    } font-sans`}
                  >
                    Email {formErrors.email && `- ${formErrors.email}`}
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        formErrors.email
                          ? "text-[var(--color-negative)]"
                          : "text-contrast-medium"
                      }`}
                      size={18}
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border ${
                        formErrors.email
                          ? "border-[var(--color-negative)] focus:ring-[var(--color-negative)]"
                          : "border-[var(--color-border-light)] focus:ring-[var(--color-primary)] hover:border-[var(--color-border-hover)]"
                      } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200`}
                      required={!isLogin}
                      disabled={loading}
                      placeholder="Enter your email"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={
                        formErrors.email ? "email-error" : undefined
                      }
                    />
                  </div>
                </motion.div>
              )}

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-1.5 ${
                    formErrors.password
                      ? "text-[var(--color-negative)]"
                      : "text-contrast-high"
                  } font-sans`}
                >
                  Password {formErrors.password && `- ${formErrors.password}`}
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      formErrors.password
                        ? "text-[var(--color-negative)]"
                        : "text-contrast-medium"
                    }`}
                    size={18}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-2.5 text-sm border ${
                      formErrors.password
                        ? "border-[var(--color-negative)] focus:ring-[var(--color-negative)]"
                        : "border-[var(--color-border-light)] focus:ring-[var(--color-primary)] hover:border-[var(--color-border-hover)]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200`}
                    required
                    disabled={loading}
                    placeholder={
                      isLogin ? "Enter your password" : "Create a password"
                    }
                    minLength={isLogin ? undefined : 8}
                    aria-invalid={!!formErrors.password}
                    aria-describedby={
                      formErrors.password ? "password-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-contrast-medium hover:text-[var(--color-primary)] transition-colors duration-200"
                    tabIndex="-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {!isLogin && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-contrast-medium">
                        Password strength:
                      </span>
                      <span className="text-xs font-medium text-contrast-high">
                        {passwordStrength <= 1
                          ? "Weak"
                          : passwordStrength <= 3
                          ? "Medium"
                          : "Strong"}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-border-light)] rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          passwordStrength <= 1
                            ? "bg-[var(--color-negative)]"
                            : passwordStrength <= 3
                            ? "bg-[var(--color-accent1)]"
                            : "bg-[var(--color-positive)]"
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-contrast-medium font-sans">
                      Use 8+ characters with a mix of letters, numbers & symbols
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium mb-1.5 ${
                      formErrors.confirmPassword
                        ? "text-[var(--color-negative)]"
                        : "text-contrast-high"
                    } font-sans`}
                  >
                    Confirm Password{" "}
                    {formErrors.confirmPassword &&
                      `- ${formErrors.confirmPassword}`}
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        formErrors.confirmPassword
                          ? "text-[var(--color-negative)]"
                          : "text-contrast-medium"
                      }`}
                      size={18}
                    />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-2.5 text-sm border ${
                        formErrors.confirmPassword
                          ? "border-[var(--color-negative)] focus:ring-[var(--color-negative)]"
                          : "border-[var(--color-border-light)] focus:ring-[var(--color-primary)] hover:border-[var(--color-border-hover)]"
                      } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200`}
                      required={!isLogin}
                      disabled={loading}
                      placeholder="Confirm your password"
                      aria-invalid={!!formErrors.confirmPassword}
                      aria-describedby={
                        formErrors.confirmPassword
                          ? "confirm-password-error"
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-contrast-medium hover:text-[var(--color-primary)] transition-colors duration-200"
                      tabIndex="-1"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && (
                    <div className="mt-1 flex items-center">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <Check className="h-4 w-4 text-[var(--color-positive)] mr-1" />
                          <span className="text-xs text-[var(--color-positive)] font-sans">
                            Passwords match
                          </span>
                        </>
                      ) : formData.confirmPassword ? (
                        <>
                          <AlertCircle className="h-4 w-4 text-[var(--color-accent1)] mr-1" />
                          <span className="text-xs text-[var(--color-accent1)] font-sans">
                            Passwords don't match
                          </span>
                        </>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-1"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="lego-button w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-lg font-medium font-sans hover:bg-[var(--color-primary)]/90 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      <span>
                        {isLogin ? "Signing in..." : "Creating account..."}
                      </span>
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-[var(--color-border-light)]" />
                <span className="mx-3 text-xs text-contrast-medium font-sans">or</span>
                <div className="flex-1 h-px bg-[var(--color-border-light)]" />
              </div>

              {/* Google Sign-In Button (Themed) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={loading || googleLoading}
                  className="w-full py-3 px-4 rounded-lg font-medium font-sans border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      <span>Connecting to Google...</span>
                    </>
                  ) : (
                    <>
                      {/* Minimal Google G icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.083 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.083 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                        <path fill="#4CAF50" d="M24 44c5.176 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.139 35.091 26.715 36 24 36c-5.202 0-9.62-3.317-11.283-7.946l-6.533 5.032C9.5 39.556 16.227 44 24 44z"/>
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.793 2.237-2.231 4.166-4.084 5.565l.003-.002 6.19 5.238C39.011 36.798 44 31.5 44 24c0-1.341-.138-2.651-.389-3.917z"/>
                      </svg>
                      <span>{isLogin ? "Continue with Google" : "Sign up with Google"}</span>
                    </>
                  )}
                </button>
                {/* Hidden GIS-rendered button for programmatic trigger */}
                <div ref={googleBtnRef} className="hidden" />
              </motion.div>

              {/* Toggle between Login/Register */}
              <motion.div
                className="text-center mt-6 pt-4 border-t border-[var(--color-border-light)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-contrast-medium font-sans">
                  {isLogin
                    ? "New to CryptoG Signals?"
                    : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormErrors({});
                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center justify-center mx-auto transition-colors duration-200 font-sans"
                >
                  {isLogin ? (
                    <>
                      <User className="mr-1.5 h-4 w-4" />
                      <span>Create an account</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      <span>Sign in instead</span>
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AuthForm;
