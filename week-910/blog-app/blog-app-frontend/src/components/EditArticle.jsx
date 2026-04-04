import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditArticle() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useAuth((state) => state.currentUser)

  // Article passed from AuthorProfile via navigate state (no extra API call needed)
  const article = location.state?.article

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  // Pre-fill the form fields with the existing article data when component mounts
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        category: article.category,
        content: article.content,
      })
    }
  }, [article, reset])

  // Guard: if article is not passed in state (e.g. direct URL access), show error
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-xl text-red-500">
          Article data not found. Please navigate from your profile.
        </p>
        <button
          onClick={() => navigate('/author-profile')}
          className="text-indigo-600 font-semibold hover:underline"
        >
          ← Go to My Articles
        </button>
      </div>
    )
  }

  // Handle form submit: PUT /author-api/articles
  // Sends: articleId, author (currentUser._id), title, category, content
  const onSave = async (formData) => {
    try {
      await axios.put(
        'http://localhost:4000/author-api/articles',
        {
          articleId: article._id,     // which article to update
          author: currentUser._id,    // checked by checkAuthor middleware
          title: formData.title,
          category: formData.category,
          content: formData.content,
        },
        { withCredentials: true }     // sends the httpOnly JWT cookie
      )
      toast.success('Article updated successfully!')
      navigate('/author-profile')     // return to profile after save
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to update article'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            title="Go back"
          >
            ←
          </button>
          <h1 className="text-2xl font-extrabold text-gray-800">Edit Article</h1>
        </div>

        <form onSubmit={handleSubmit(onSave)} noValidate>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' },
                maxLength: { value: 150, message: 'Title cannot exceed 150 characters' },
              })}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category
            </label>
            <input
              type="text"
              {...register('category', {
                required: 'Category is required',
                minLength: { value: 2, message: 'Category must be at least 2 characters' },
                maxLength: { value: 50, message: 'Category cannot exceed 50 characters' },
              })}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Content
            </label>
            <textarea
              {...register('content', {
                required: 'Content is required',
                minLength: { value: 20, message: 'Content must be at least 20 characters' },
              })}
              rows={8}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditArticle
