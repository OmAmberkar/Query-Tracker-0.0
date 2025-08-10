# 🚀 Query Tracker - Demo Deployment Guide

## ⚠️ **IMPORTANT: Demo Environment Setup**

### 1. **Install Dependencies**
```bash
# Server
cd server
npm install

# Client  
cd ../client
npm install
```

### 2. **Environment Variables**
Create `.env` file in server folder:
```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration (USE TEST DATABASE!)
MONGODB_URI=mongodb://localhost:27017
DB_NAME=query_tracker_demo

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Security (CHANGE THESE FOR PRODUCTION!)
JWT_SECRET=demo-secret-key-change-in-production
COOKIE_SECRET=demo-cookie-secret-change-in-production
```

### 3. **Database Setup**
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas (free tier)
# Update MONGODB_URI in .env
```

### 4. **Run Application**
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client  
npm run dev
```

### 5. **Test Endpoints**
- Health Check: `http://localhost:8080/health`
- Frontend: `http://localhost:5173`

## 🔒 **Security Features Added**
- ✅ Input validation & sanitization
- ✅ Rate limiting (100 requests/15min)
- ✅ Security headers (Helmet)
- ✅ CORS protection
- ✅ Error handling
- ✅ Request size limits

## 🚨 **Demo Safety Notes**
- Use test database only
- Don't expose real credentials
- Limited to localhost/private network
- Not suitable for production use

## 📝 **What's Still Needed for Production**
- JWT authentication
- HTTPS/SSL
- Database backups
- Monitoring & logging
- CI/CD pipeline
- Load balancing
- Security audits
