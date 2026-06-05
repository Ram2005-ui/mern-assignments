import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

function AddArticle() {
  const currentUser = useAuth((state) => state.currentUser)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  // Handle article publish
  // POST /author-api/articles  { title, category, content, author: currentUser._id }
  const onAddArticle = async (formData) => {
    try {
      await axios.post(
        `${API_BASE_URL}/author-api/articles`,
        {
          title: formData.title,
          category: formData.category,
          content: formData.content,
          author: currentUser._id, // required by ArticleModel (ObjectId ref to user)
        },
        { withCredentials: true } // sends the httpOnly JWT cookie
      )
      toast.success('Article published!')
      navigate('/author-profile') // go back to profile after publishing
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to publish article. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Go back"
          >
            ←
          </button>
          <h1 className="text-2xl font-extrabold text-gray-800">Write New Article</h1>
        </div>

        <form onSubmit={handleSubmit(onAddArticle)} noValidate>

          {/* Title — required by ArticleModel, minLength 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' },
                maxLength: { value: 150, message: 'Title cannot exceed 150 characters' },
              })}
              placeholder="Article title..."
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category — required by ArticleModel */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
            <input
              type="text"
              {...register('category', {
                required: 'Category is required',
                minLength: { value: 2, message: 'Category must be at least 2 characters' },
                maxLength: { value: 50, message: 'Category cannot exceed 50 characters' },
              })}
              placeholder="e.g. Technology, Travel, Health..."
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Content — required by ArticleModel, minLength 20 */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Content</label>
            <textarea
              {...register('content', {
                required: 'Content is required',
                minLength: { value: 20, message: 'Content must be at least 20 characters' },
              })}
              placeholder="Write your article content here..."
              rows={8}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
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
              className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddArticle