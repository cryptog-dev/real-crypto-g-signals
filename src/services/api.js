// Blog API service
export const blogsAPI = {
  async getBlogs() {
    // Return mock data for now
    return [
      {
        id: 1,
        title: 'Getting Started with Crypto Trading',
        excerpt: 'Learn the basics of cryptocurrency trading and how to get started.',
        date: '2023-10-15',
        author: 'Crypto Expert',
        content: '...',
        image: '/images/blog1.jpg'
      },
      {
        id: 2,
        title: 'Understanding Market Trends',
        excerpt: 'How to read and interpret cryptocurrency market trends effectively.',
        date: '2023-10-10',
        author: 'Market Analyst',
        content: '...',
        image: '/images/blog2.jpg'
      }
    ];
  },
  
  // Add other API methods as needed
  async createBlog(blogData) {
    // Implementation for creating a blog
    return { success: true, data: { ...blogData, id: Date.now() } };
  },
  
  async updateBlog(id, updates) {
    // Implementation for updating a blog
    return { success: true, data: { id, ...updates } };
  },
  
  async deleteBlog(id) {
    // Implementation for deleting a blog
    return { success: true, id };
  }
};

// Signals API service
export const signalsAPI = {
  async getSignals() {
    // Return mock data for now
    return [
      {
        id: 1,
        pair: 'BTC/USDT',
        type: 'BUY',
        entryPrice: 45000,
        targetPrice: 48000,
        stopLoss: 44000,
        timestamp: '2023-10-24T10:30:00Z',
        status: 'active',
        risk: 'medium'
      },
      {
        id: 2,
        pair: 'ETH/USDT',
        type: 'SELL',
        entryPrice: 3500,
        targetPrice: 3400,
        stopLoss: 3600,
        timestamp: '2023-10-24T09:15:00Z',
        status: 'active',
        risk: 'low'
      }
    ];
  },
  
  async createSignal(signalData) {
    return { success: true, data: { ...signalData, id: Date.now() } };
  },
  
  async updateSignal(id, updates) {
    return { success: true, data: { id, ...updates } };
  },
  
  async deleteSignal(id) {
    return { success: true, id };
  }
};

export default {
  blogs: blogsAPI,
  signals: signalsAPI
};
