import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AddArticle from './components/AddArticle'
import EditArticle from './components/EditArticle'
import UserProfile from './components/UserProfile'
import AuthorProfile from './components/AuthorProfile'
import ArticleByID from './components/ArticleByID'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAuth } from './store/authStore'
import ErrorBoundary from './components/ErrorBoundary'

function App(){
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,        // Header + Outlet + Footer
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes — no authentication required
      { path: '', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },

      // USER-only protected route
      // ProtectedRoute checks isAuthenticated + role === 'USER'
      {
        path: 'user-profile',
        element: (
          <ProtectedRoute allowedRole="USER">
            <UserProfile />
          </ProtectedRoute>
        ),
      },

      // AUTHOR-only protected routes
      {
        path: 'author-profile',
        element: (
          <ProtectedRoute allowedRole="AUTHOR">
            <AuthorProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-article',
        element: (
          <ProtectedRoute allowedRole="AUTHOR">
            <AddArticle />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-article',
        element: (
          <ProtectedRoute allowedRole="AUTHOR">
            <EditArticle />
          </ProtectedRoute>
        ),
      },

      // Shared route — accessible by both USER and AUTHOR
      // ArticleByID checks useLocation state first, then falls back to API call
      {
        path: 'article/:id',
        element: (
          <ProtectedRoute>
            <ArticleByID />
          </ProtectedRoute>
        ),
      },
    ],
  },
])


  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App