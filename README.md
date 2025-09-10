# CryptoG Signals 📈

A modern, responsive cryptocurrency trading signals application built with React and Vite. This platform provides real-time trading signals, market analysis, and interactive charts for cryptocurrency traders.

## 🚀 Features

### Trading Signals
- **JSON-Based Target System**: Supports advanced price:status target tracking with JSON format
  ```json
  {"45000": "pending", "47000": "hit", "49000": "pending"}
  ```
- **Legacy Format Support**: Backward compatible with comma-separated values
- **Real-time Signal Management**: Create, edit, and track trading signals
- **Status Tracking**: Monitor signal progress with pending, success, and fail states
- **ROI Calculations**: Automatic calculation of potential returns based on leverage
- **Stop Loss Management**: Configure and track stop loss levels

### Market Analysis
- **Blog System**: Create and manage market insight articles
- **Rich Content**: Support for images and formatted content
- **Expert Analysis**: Share trading strategies and market commentary

### User Experience
- **Role-Based Access**: Admin, Premium, and Free user tiers
- **Theme Support**: Market Day and Market Night themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Filtering**: Filter signals by status, direction, and coin
- **Real-time Updates**: Live data synchronization

### Premium Features
- **Advanced Charts**: TradingView integration with technical indicators
- **Detailed ROI Analytics**: Comprehensive profit/loss calculations
- **Target Price Visibility**: Full access to price targets and stop losses
- **Performance Tracking**: Historical success rate metrics

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: Lucide React icons, Framer Motion animations
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Authentication**: JWT token-based authentication
- **Development**: ESLint for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-crypto-g-signals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── CreateEditModal.jsx    # Signal/blog creation modal
│   ├── SignalsList.jsx        # Signals display and filtering
│   ├── BlogsList.jsx          # Market analysis articles
│   ├── ChartsTab.jsx          # Trading charts
│   ├── DashboardStats.jsx     # Statistics dashboard
│   ├── Navbar.jsx             # Navigation component
│   └── Footer.jsx             # Footer component
├── context/             # React Context providers
│   ├── AuthContext.jsx        # Authentication state
│   └── ThemeContext.jsx       # Theme management
├── hooks/               # Custom React hooks
│   ├── useApi.js              # API interaction hook
│   └── useLocalStorage.js     # Local storage management
├── utils/               # Utility functions
│   ├── api.js                 # API client configuration
│   └── formatters.js          # Data formatting utilities
├── constants/           # Application constants
│   └── index.js               # API endpoints, user roles, etc.
├── App.jsx              # Main application component
├── ProductApp.jsx       # Main dashboard component
└── main.jsx             # Application entry point
```

## 🔧 Configuration

### API Configuration
The application expects a REST API with the following endpoints:
- `POST /auth/token/` - User authentication
- `POST /auth/register/` - User registration
- `GET /signals/` - Fetch all signals
- `POST /signals/` - Create new signal
- `PUT /signals/:id/` - Update signal
- `DELETE /signals/:id/` - Delete signal
- `GET /blogs/` - Fetch all blogs
- `POST /blogs/` - Create new blog
- `PUT /blogs/:id/` - Update blog
- `DELETE /blogs/:id/` - Delete blog

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL

## 📊 Signal Format

### New JSON Format (Recommended)
```json
{
  "coin": "BTC/USDT",
  "direction": "buy",
  "entry_price": 45000,
  "leverage": 10,
  "stop_loss": 43000,
  "targets": "{\"47000\": \"pending\", \"49000\": \"hit\", \"51000\": \"pending\"}",
  "status": "pending"
}
```

### Legacy Format (Still Supported)
```json
{
  "targets": "47000, 49000, 51000"
}
```

## 👥 User Roles

- **Admin**: Full access to create, edit, and delete signals and blogs
- **Premium**: Access to detailed analytics, ROI calculations, and advanced charts
- **Free**: Basic access to signals with limited features

## 🎨 Theming

The application supports two themes:
- **Market Day**: Light theme optimized for daytime trading
- **Market Night**: Dark theme for extended trading sessions

## 🚀 Development

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run lint`: Run ESLint for code quality
- `npm run preview`: Preview production build locally

### Code Style

The project uses ESLint with React-specific rules. Run `npm run lint` to check code quality.

## 📱 Responsive Design

The application is fully responsive with:
- Desktop-first design with mobile optimization
- Touch-friendly mobile navigation
- Responsive grid layouts
- Mobile-optimized modals and forms

## 🔐 Authentication

JWT-based authentication with:
- Access token for API requests
- Refresh token for session management
- Automatic token refresh
- Secure local storage handling

## 📈 Performance

- **Lazy Loading**: Components loaded on demand
- **Optimized Bundles**: Vite's efficient bundling
- **Image Optimization**: Responsive image loading
- **Efficient Re-renders**: Optimized React component updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Contact

- Email: therealcryptog.official@gmail.com
- Twitter: [@T_Cryptog](https://x.com/T_Cryptog)
- Instagram: [@therealcrypto_g](https://www.instagram.com/therealcrypto_g/)
- Telegram: [therealcryptog_official](https://t.me/therealcryptog_official)
