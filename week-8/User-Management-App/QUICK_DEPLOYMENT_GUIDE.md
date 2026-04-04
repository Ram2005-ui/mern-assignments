# Quick Deployment Checklist

## Step-by-Step Guide to Deploy on Vercel

### Prerequisites
- [ ] GitHub account
- [ ] Vercel account (https://vercel.com)
- [ ] MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- [ ] Git installed locally

---

## Phase 1: Prepare Your Code (5 minutes)

### 1. Create GitHub Repositories

**Backend Repository:**
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/user-management-backend.git
git push -u origin main
```

**Frontend Repository:**
```bash
cd ../frontend
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/user-management-frontend.git
git push -u origin main
```

### 2. Setup MongoDB Atlas (10 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account if needed
3. Create a cluster:
   - Choose Free tier
   - Select region closest to you
   - Click "Create Cluster"
4. Wait for cluster to be created (5-10 minutes)
5. Get Connection String:
   - Click "Connect"
   - Choose "Drivers" → "Node.js"
   - Copy connection string
   - Update password: replace `<password>` with your DB password
   - Keep the URL safe - you'll need it for Vercel

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/user-management
```

---

## Phase 2: Deploy Backend (10 minutes)

### 1. Go to Vercel Dashboard

- Visit https://vercel.com/dashboard
- Sign in with GitHub

### 2. Create New Backend Project

1. Click "New Project"
2. Click "Import Git Repository"
3. Select your backend repository
4. Click "Import"

### 3. Configure Environment Variables

1. Go to "Settings" → "Environment Variables"
2. Add these variables:

| Name | Value |
|------|-------|
| `DB_URL` | `mongodb+srv://username:password@cluster.mongodb.net/user-management` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | *(leave blank for now, update after frontend deployment)* |

3. Click "Save"

### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete (2-3 minutes)
3. Copy the deployment URL - it will look like:
   ```
   https://user-management-backend.vercel.app
   ```
4. Save this URL - you'll need it for the frontend!

---

## Phase 3: Deploy Frontend (10 minutes)

### 1. Update Environment Variables Locally

In your frontend folder, create `.env.local`:
```
VITE_API_URL=https://user-management-backend.vercel.app
```

Or whatever your backend URL is.

### 2. Deploy Frontend on Vercel

1. Go to Vercel Dashboard
2. Click "New Project"
3. Click "Import Git Repository"
4. Select your frontend repository
5. Click "Import"

### 3. Configure Frontend Settings

1. Framework: Should auto-detect "Vite"
2. Build Command: `npm run build`
3. Output Directory: `dist`

### 4. Environment Variables

1. Go to "Settings" → "Environment Variables"
2. Add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app` |

3. Click "Save"

### 5. Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Your app is now live! Copy the frontend URL

---

## Phase 4: Final Configuration (5 minutes)

### Update Backend CORS

Now that you have the frontend URL, update backend:

1. Go back to Backend Vercel Project
2. Go to "Settings" → "Environment Variables"
3. Update/Add new variable:

| Name | Value |
|------|-------|
| `FRONTEND_URL` | `https://your-frontend-url.vercel.app` |

4. Go to "Deployments"
5. Click the three dots on the latest deployment
6. Select "Redeploy"

---

## Phase 5: Test Your App

1. Visit your frontend URL: `https://your-app-name.vercel.app`
2. Test these features:
   - [ ] Navigate to "Add User" page
   - [ ] Create a new user
   - [ ] Go to "Users" page
   - [ ] Verify user appears in list
   - [ ] Delete a user
   - [ ] Check error messages appear correctly

---

## Troubleshooting

### CORS Error
**Problem:** "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution:**
1. Go to Backend project on Vercel
2. Check Environment Variables - ensure `FRONTEND_URL` is set correctly
3. Redeploy backend
4. Clear browser cache and refresh

### API 404 Error
**Problem:** "Cannot POST /user-api/users"

**Solution:**
1. Verify `VITE_API_URL` in frontend is correct
2. Check backend deployment logs for errors
3. Test API directly: `curl https://your-backend.vercel.app/user-api/users`

### MongoDB Connection Error
**Problem:** "Cannot connect to MongoDB"

**Solution:**
1. Verify connection string in `DB_URL` environment variable
2. Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0)
3. Verify password is correct
4. Test connection locally before deploying

### Build Fails
**Problem:** "Build failed with error"

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are installed locally
3. Verify no errors: `npm run build`
4. Fix any issues locally before pushing to GitHub

---

## View Logs

**Backend Logs:**
1. Vercel Dashboard → Backend Project
2. Go to "Deployments"
3. Click latest deployment
4. Click "Runtime Logs"

**Frontend Logs:**
1. Vercel Dashboard → Frontend Project
2. Same as above

---

## Useful Commands

```bash
# Install dependencies
npm install

# Build locally
npm run build

# Test production build
npm run preview

# Push changes to GitHub
git add .
git commit -m "Your message"
git push
```

---

## Success! 🎉

Your app is now deployed and live!

**Frontend:** https://your-frontend-url.vercel.app
**Backend API:** https://your-backend-url.vercel.app
**Database:** MongoDB Atlas

Share your app URL with anyone and it works!

---

## Next Steps (Optional)

- [ ] Add custom domain to Vercel projects
- [ ] Set up analytics
- [ ] Configure automatic deployments
- [ ] Add more features
- [ ] Set up email notifications for deployments
