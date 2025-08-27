import React, { useState, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductApp from "./ProductApp";
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, AlertCircle, Check, Loader2, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import "./index.css";

const AppContent = () => {
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const { login, register, user } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  // Check password strength and update state
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (!password) return 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[0-9]/.test(password)) strength += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special chars
    
    // Cap at 5 for the progress bar
    return Math.min(strength, 5);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!isLogin) {
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.password) {
        errors.password = 'Password is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
    
    // Update password strength
    if (name === 'password' && !isLogin) {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Clear any global errors
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
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
          
          // Auto-login after successful registration
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
      console.error('Auth error:', error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show the main app if user is authenticated
  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ProductApp />
        </main>
        <Footer />
      </div>
    );
  }

  // Show login/signup form if user is not authenticated
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <main className="flex-grow flex items-start md:items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          className="w-full max-w-md mx-auto my-4 md:my-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
          }}
        >
          <form 
            onSubmit={handleSubmit} 
            className={`p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 hover:shadow-xl`}
            >
            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {isLogin ? 'Sign in to continue to Crypto Signals' : 'Join us to get started'}
                </p>
              </motion.div>
              
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md flex items-start text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200"
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
                  className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-md flex items-start text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200"
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
                  className={`block text-sm font-medium mb-1.5 ${formErrors.username ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  Username {formErrors.username && `- ${formErrors.username}`}
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${formErrors.username ? 'text-red-400' : 'text-gray-400'}`}
                    size={18}
                  />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 text-sm border ${formErrors.username ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200`}
                    required
                    disabled={loading}
                    placeholder="Enter your username"
                    aria-invalid={!!formErrors.username}
                    aria-describedby={formErrors.username ? 'username-error' : undefined}
                  />
                </div>
              </motion.div>

              {/* Email Field - Only shown in register mode */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label 
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1.5 ${formErrors.email ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    Email {formErrors.email && `- ${formErrors.email}`}
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${formErrors.email ? 'text-red-400' : 'text-gray-400'}`}
                      size={18}
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border ${formErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200`}
                      required={!isLogin}
                      disabled={loading}
                      placeholder="Enter your email"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
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
                  className={`block text-sm font-medium mb-1.5 ${formErrors.password ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  Password {formErrors.password && `- ${formErrors.password}`}
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${formErrors.password ? 'text-red-400' : 'text-gray-400'}`}
                    size={18}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-2.5 text-sm border ${formErrors.password ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200`}
                    required
                    disabled={loading}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    minLength={isLogin ? undefined : 8}
                    aria-invalid={!!formErrors.password}
                    aria-describedby={formErrors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    tabIndex="-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {!isLogin && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Password strength:
                      </span>
                      <span className="text-xs font-medium">
                        {passwordStrength <= 1 ? 'Weak' : 
                         passwordStrength <= 3 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div 
                        className={`h-1.5 rounded-full ${
                          passwordStrength <= 1 ? 'bg-red-500' : 
                          passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Use 8+ characters with a mix of letters, numbers & symbols
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Confirm Password Field - Only shown in register mode */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label 
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium mb-1.5 ${formErrors.confirmPassword ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    Confirm Password {formErrors.confirmPassword && `- ${formErrors.confirmPassword}`}
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${formErrors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`}
                      size={18}
                    />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-2.5 text-sm border ${formErrors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200`}
                      required={!isLogin}
                      disabled={loading}
                      placeholder="Confirm your password"
                      aria-invalid={!!formErrors.confirmPassword}
                      aria-describedby={formErrors.confirmPassword ? 'confirm-password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      tabIndex="-1"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.password && formData.confirmPassword && (
                    <div className="mt-1 flex items-center">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-600 dark:text-green-400">
                            Passwords match
                          </span>
                        </>
                      ) : formData.confirmPassword ? (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">
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
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                    </>
                  ) : isLogin ? "Sign In" : "Create Account"}
                </button>
              </motion.div>
                            {/* Social Login Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or sign in with
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FcGoogle className="h-5 w-5" />
                    <span className="ml-2 hidden sm:inline">Google</span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    className="flex-1 flex items-center justify-center px-4 py-2.5 border border-blue-500 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Twitter className="h-5 w-5 text-white" />
                    <span className="ml-2 hidden sm:inline">Twitter</span>
                  </motion.button>
                </div>
              </motion.div>


              {/* Toggle between Login/Register */}
              <motion.div 
                className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormErrors({});
                  }}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none flex items-center justify-center mx-auto transition-colors duration-200"
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

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;