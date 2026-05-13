import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

// Helper: convert UTC date string → IST formatted string
function toIST(dateStr) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

function ArticleByID() {
  const location = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  const currentUser = useAuth((state) => state.currentUser)
  

  // Step 1: Check if article was passed via navigate state (useLocation)
  // This avoids an unnecessary API call when user clicks "Read" from the list
  const [article, setArticle] = useState(location.state?.article || null)
  const [loading, setLoading] = useState(!article) // skip loading if already have article
  const [error, setError] = useState(null)

  // Comment form state
  const [comment, setComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    // Step 2: Only call the API if article is NOT available from useLocation
    // (e.g., user typed the URL directly or refreshed the page)
    if (article) return

    const fetchArticle = async () => {
      try {
        setLoading(true)
        // GET /common-api/articles/:id — public route
        const res = await axios.get(
          `${API_BASE_URL}/common-api/articles/${id}`,
          { withCredentials: true }
        )
        setArticle(res.data.payload || null)
        if (!res.data.payload) setError('Article not found')
      } catch (err) {
        setError('Failed to load the article.')
        toast.error('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  // Handle adding a new comment (USER only)
  // POST /user-api/articles/comments  { articleId, comment }
  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      setCommentLoading(true)
      const res = await axios.post(
        `${API_BASE_URL}/user-api/articles/comments`,
        { articleId: article._id, comment: comment.trim() },
        { withCredentials: true }
      )
      // Update article in local state with the returned updated article (has new comment appended)
      setArticle(res.data.payload)
      setComment('') // clear the input
      toast.success('Comment added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add comment')
    } finally {
      setCommentLoading(false)
    }
  }

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-400 animate-pulse">Loading article...</p>
      </div>
    )
  }

  // Error / not found
  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-xl text-red-500">{error || 'Article not found.'}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Go Back
        </button>
      </div>
    )
  }

  // Resolve author name from populated field
  const authorName =
    article.author?.firstName ||
    article.author?.username ||
    article.author ||
    'Unknown Author'

  const isUser = currentUser?.role === 'USER'

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 font-semibold hover:underline flex items-center gap-1"
        >
          ← Back to Articles
        </button>

        {/* Article Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Gradient header band */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-600 px-8 py-6">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              {article.category || 'General'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {article.title}
            </h1>
          </div>

          {/* Meta: author + timestamps */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
            <div>
              <span className="font-semibold text-gray-700">Author: </span>
              {authorName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Published: </span>
              {toIST(article.createdAt)}
            </div>
            {article.updatedAt && article.updatedAt !== article.createdAt && (
              <div>
                <span className="font-semibold text-gray-700">Last Updated: </span>
                {toIST(article.updatedAt)}
              </div>
            )}
          </div>

          {/* Article content */}
          <div className="px-8 py-8">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
              {article.content}
            </p>
          </div>
        </div>

        {/* ─── Comments Section ─── */}
        <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              Comments ({article.comments?.length || 0})
            </h2>
          </div>

          {/* Existing comments list */}
          <div className="px-8 py-4 space-y-4">
            {!article.comments || article.comments.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">
                No comments yet.{isUser ? ' Be the first!' : ''}
              </p>
            ) : (
              article.comments.map((c, idx) => {
                // c.user may be populated { firstName, username } or just an ID string
                const commenterName =
                  c.user?.firstName || c.user?.username || 'Anonymous'
                return (
                  <div
                    key={c._id || idx}
                    className="flex gap-3 py-3 border-b border-gray-50 last:border-0"
                  >
                    {/* Avatar placeholder */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                      {commenterName[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{commenterName}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{c.comment}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Add comment form — only visible to logged-in USERs */}
          {isUser && (
            <form
              onSubmit={handleAddComment}
              className="px-8 py-5 border-t border-gray-100 bg-gray-50/50"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add a Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
              <button
                type="submit"
                disabled={commentLoading || !comment.trim()}
                className="mt-3 px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default ArticleByID
