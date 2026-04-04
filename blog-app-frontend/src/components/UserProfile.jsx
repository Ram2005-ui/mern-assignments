import React, { useState, useEffect } from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function UserProfile() {
  // Read logout action and navigate from hooks
  const logout = useAuth((state) => state.logout)
  const currentUser = useAuth((state) => state.currentUser)
  const navigate = useNavigate()

  // Local state for articles, loading flag, and error message
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all articles from all authors on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        // USER-protected endpoint: GET /user-api/articles
        // Returns all active articles from all authors
        const res = await axios.get('http://localhost:4000/user-api/articles', {
          withCredentials: true,
        })
        setArticles(res.data.payload || [])
      } catch (err) {
        setError('Failed to load articles')
        toast.error('Failed to load articles')
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  // Handle logout: clear auth state and redirect to login
  const onLogout = async () => {
    try {
      await logout()
      toast.success('Logout successfully')
      navigate('/login')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  // Navigate to ArticleByID, passing the full article object via location state
  // so ArticleByID can display it immediately without an extra API call
  const handleReadArticle = (article) => {
    navigate(`/article/${article._id}`, { state: { article } })
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">

      {/* Header bar */}
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">All Articles</h1>
        <div className="ml-auto flex items-center gap-4">
        <button
          onClick={onLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Logout
        </button>
        <span className='font-semibold text-indigo-500'>Welcome,{currentUser?.firstName}</span>
        {currentUser?.profileImageUrl && (
          <img
            src={currentUser.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-xl mt-10 text-gray-500 animate-pulse">
          Loading articles...
        </p>
      )}

      {/* Error state */}
      {error && (
        <p className="text-center text-xl mt-10 text-red-500">{error}</p>
      )}

      {/*
        Responsive grid of article cards:
          xs  (default)  → 1 column   (grid-cols-1)
          sm  (≥640 px)  → 2 columns  (sm:grid-cols-2)
          md  (≥768 px)  → 3 columns  (md:grid-cols-3)
          lg+ (≥1024 px) → 4 columns  (lg:grid-cols-4)
      */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {articles.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl text-gray-400 font-medium">No articles found.</p>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Category badge */}
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3 self-start">
                    {article.category || 'General'}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>

                  {/* Content preview */}
                  <p className="mt-3 text-gray-600 line-clamp-3 leading-relaxed flex-1">
                    {article.content}
                  </p>

                  {/* Timestamp in IST */}
                  <p className="mt-4 text-xs text-gray-400">
                    Published:{' '}
                    {new Date(article.createdAt).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>

                {/* Card footer — Read button */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                  <button
                    onClick={() => handleReadArticle(article)}
                    className="text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors"
                  >
                    Read Full Article →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default UserProfile