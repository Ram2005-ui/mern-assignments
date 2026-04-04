# Deployment Guide - User Management App on Vercel

## Overview
This guide covers deploying a full-stack MERN application on Vercel:
- **Frontend**: React + Vite (Vercel)
- **Backend**: Node.js + Express (Vercel Serverless Functions or separate platform)
- **Database**: MongoDB Atlas (Cloud)

---

## Phase 1: Prepare Backend for Deployment

### Step 1: Update Backend package.json

Add a start script:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 2: Update Backend server.js

Make sure your server.js has proper port configuration:
```javascript
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 3: Create Backend .env file
```
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/user-management
PORT=4000
NODE_ENV=production
```

### Step 4: Create vercel.json in backend folder
```json
{
  "version": 2,
  "functions": {
    "server.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "routes": [
    {
      "src": "/user-api/(.*)",
      "dest": "server.js"
    }
  ]
}
```

---

## Phase 2: Prepare Frontend for Deployment

### Step 1: Update Frontend .env

Create `.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

### Step 2: Update API calls in Frontend

In `src/context/UserContext.jsx`, change:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Then use:
let res = await fetch(`${API_BASE_URL}/user-api/users`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userData)
});
```

### Step 3: Create vercel.json in frontend (root)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite-api-url"
  }
}
```

---

## Phase 3: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free tier cluster

### Step 2: Get Connection String
1. In MongoDB Atlas, go to "Connect"
2. Choose "Drivers" → "Node.js"
3. Copy connection string
4. Replace `<password>` with your database password
5. Format: `mongodb+srv://username:password@cluster.mongodb.net/user-management`

### Step 3: Whitelist IP Addresses
- In Atlas, add IP: 0.0.0.0/0 (allow all for testing)
- For production, use specific IPs

---

## Phase 4: Deploy Backend on Vercel

### Option A: Deploy Backend on Vercel (Recommended for simplicity)

1. **Push backend to GitHub**
```bash
cd backend
git init
git add .
git commit -m "Backend initial commit"
git remote add origin https://github.com/yourusername/user-backend.git
git push -u origin main
```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Click "New Project"
   - Import from GitHub (select backend repo)

3. **Configure Environment Variables**
   - Go to Settings → Environment Variables
   - Add: `DB_URL = mongodb+srv://username:password@cluster.mongodb.net/user-management`
   - Add: `NODE_ENV = production`

4. **Deploy**
   - Click Deploy
   - Wait for deployment to complete
   - Note the deployment URL (e.g., `https://user-backend.vercel.app`)

### Option B: Deploy Backend on Render (Alternative)

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - Name: user-management-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables (same as above)
6. Click Deploy

---

## Phase 5: Deploy Frontend on Vercel

1. **Push frontend to GitHub**
```bash
cd frontend
git init
git add .
git commit -m "Frontend initial commit"
git remote add origin https://github.com/yourusername/user-frontend.git
git push -u origin main
```

2. **Go to Vercel Dashboard**
   - Click "New Project"
   - Import from GitHub (select frontend repo)

3. **Configure Build & Environment**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL = https://your-backend-url.vercel.app`

4. **Deploy**
   - Click Deploy
   - Your app will be live at: `https://your-app-name.vercel.app`

---

## Phase 6: Update CORS in Backend

Update server.js CORS configuration:
```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app"
  ]
}));
```

---

## Phase 7: Testing & Troubleshooting

### Test Backend API
```bash
curl https://your-backend-url.vercel.app/user-api/users
```

### View Logs
- **Vercel Backend**: Dashboard → Deployments → View Logs
- **Vercel Frontend**: Dashboard → Deployments → View Logs

### Common Issues

**1. CORS Error**
- Update CORS origin in backend with frontend URL
- Redeploy backend

**2. 404 on API Calls**
- Check if `VITE_API_URL` is set correctly
- Verify backend API routes work

**3. MongoDB Connection Error**
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas
- Use connection string: `mongodb+srv://user:pass@cluster.mongodb.net/db-name?retryWrites=true&w=majority`

---

## Phase 8: Production Checklist

- [ ] Backend deployed on Vercel/Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] CORS updated with production URLs
- [ ] API calls use environment variables
- [ ] Tested all CRUD operations
- [ ] Logs checked for errors
- [ ] Domain name configured (optional)

---

## Quick Commands

```bash
# Build frontend locally
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel (if using Vercel CLI)
vercel

# Deploy production
vercel --prod
```

---

## Next Steps

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and authenticate
3. In root folder: `vercel` to deploy
4. Follow the interactive prompts
5. Set environment variables during setup

---

## Support Links
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Render Deployment: https://render.com/docs
