import React, { useState, useEffect } from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'


function AuthorProfile() {
  const logout = useAuth((state) => state.logout)
  const currentUser = useAuth((state) => state.currentUser) // logged-in author
  const navigate = useNavigate()

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (!currentUser?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    )
  }

  // Fetch ALL articles belonging to this author (active + soft-deleted)
  // Active articles: isArticleActive === true  → can Read, Edit, Delete
  // Deleted articles: isArticleActive === false → can Restore
  const fetchArticles = async () => {
    if (!currentUser?._id){
      setArticles([])
      return
    }
    try {
      setLoading(true)
      setError(null)
      // AUTHOR-protected: GET /author-api/articles/:authorId
      // Returns ALL articles (active + inactive) — see updated AuthorAPI.js
      const res = await axios.get(
        `http://localhost:4000/author-api/articles/${currentUser._id}`,
        { withCredentials: true }
      )
      setArticles(res.data.payload || [])
    } catch (err) {
      setError('Failed to load articles')
      toast.error('Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [currentUser?._id])

  // Logout and redirect to login
  const onLogout = async () => {
    try {
      await logout()
      toast.success('Logout successfully')
      navigate('/login')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  // Navigate to ArticleByID with article passed in location state
  const handleReadArticle = (article) => {
    navigate(`/article/${article._id}`, { state: { article } })
  }

  // Navigate to EditArticle with article passed in location state (no extra API call in EditArticle)
  const handleEditArticle = (article) => {
    navigate('/edit-article', { state: { article } })
  }

  // Soft-delete an article: PATCH /author-api/articles/:id/status  { isArticleActive: false }
  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.patch(
        `http://localhost:4000/author-api/articles/${articleId}/status`,
        { isArticleActive: false },
        { withCredentials: true }
      )
      // ask for confirmation
      alert('Are you sure you want to delete this article?')
      toast.success('Article deleted')
      // Update local state immediately (no full re-fetch needed)
      setArticles((prev) =>
        prev.map((a) => (a._id === articleId ? { ...a, isArticleActive: false } : a))
      )
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete article')
    }
  }

  // Restore a soft-deleted article: PATCH /author-api/articles/:id/status  { isArticleActive: true }
  const handleRestoreArticle = async (articleId) => {
    try {
      await axios.patch(
        `http://localhost:4000/author-api/articles/${articleId}/status`,
        { isArticleActive: true },
        { withCredentials: true }
      )
      alert('Are you sure you want to restore this article?')
      toast.success('Article restored')
      setArticles((prev) =>
        prev.map((a) => (a._id === articleId ? { ...a, isArticleActive: true } : a))
      )
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to restore article')
    }
  }

  const authorName = currentUser?.firstName || currentUser?.username || 'Author'

  // Split articles into active and deleted for counting in the header
  const activeCount = articles.filter((a) => a.isArticleActive).length
  const deletedCount = articles.filter((a) => !a.isArticleActive).length

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">

      {/* Header bar */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Articles by {authorName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} active
            {deletedCount > 0 && (
              <span className="ml-2 text-red-400">{deletedCount} deleted</span>
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/add-article')}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            + New Article
          </button>
          <button
            onClick={onLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Logout
          </button>
          <div className='flex gap-3 m-3 items-center'>
            <span className="text-indigo-500 font-semibold">Welcome, {currentUser?.firstName}!</span>
            {currentUser?.profileImageUrl && (
              <img 
                src={currentUser.profileImageUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
            )}
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {articles.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl text-gray-400 font-medium">
                No articles published yet.
              </p>
              <button
                onClick={() => navigate('/add-article')}
                className="mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Write your first article →
              </button>
            </div>
          ) : (
            articles.map((article) => {
              const isActive = article.isArticleActive

              return (
                <div
                  key={article._id}
                  className={`rounded-2xl border flex flex-col h-full transition-all duration-300 overflow-hidden
                    ${isActive
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 group'
                      : 'bg-gray-50 border-gray-200 opacity-70'
                    }`}
                >
                  <div className="p-5 flex flex-col flex-1">
                    {/* Status badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
                        ${isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-red-50 text-red-500'
                        }`}>
                        {article.category || 'General'}
                      </span>
                      {!isActive && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs font-bold rounded-full">
                          Deleted
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className={`text-lg font-bold line-clamp-2 transition-colors
                      ${isActive ? 'text-gray-800 group-hover:text-indigo-600' : 'text-gray-500'}`}>
                      {article.title}
                    </h2>

                    {/* Content preview */}
                    <p className="mt-2 text-gray-500 text-sm line-clamp-3 leading-relaxed flex-1">
                      {article.content}
                    </p>

                    {/* Timestamp in IST */}
                    <p className="mt-3 text-xs text-gray-400">
                      Published:{' '}
                      {new Date(article.createdAt).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true,
                      })}
                    </p>
                  </div>

                  {/* Card footer — action buttons */}
                  <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex gap-2 flex-wrap">

                    {isActive ? (
                      <>
                        {/* Read */}
                        <button
                          onClick={() => handleReadArticle(article)}
                          className="flex-1 text-xs text-indigo-600 font-bold hover:text-indigo-800 transition-colors text-left"
                        >
                          Read →
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition"
                        >
                          Edit
                        </button>

                        {/* Delete (soft) */}
                        <button
                          onClick={() => handleDeleteArticle(article._id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      /* Restore */
                      <button
                        onClick={() => handleRestoreArticle(article._id)}
                        className="w-full px-3 py-1 text-xs bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition"
                      >
                        ↩ Restore Article
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default AuthorProfile