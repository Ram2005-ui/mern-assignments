import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/authStore"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

function Home() {
  const navigate = useNavigate()
  const currentUser = useAuth((state) => state.currentUser)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/common-api/articles`)
        setArticles(res.data.payload?.slice(0, 4) || [])
      } catch (err) {
        setError("Could not load the latest articles.")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleExplore = () => {
    document.getElementById("latest-articles")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleStartWriting = () => {
    if (isAuthenticated && currentUser?.role === "AUTHOR") {
      navigate("/add-article")
    } else {
      navigate("/login")
    }
  }

  const handleReadFull = (articleId) => {
    if (isAuthenticated) {
      navigate(`/article/${articleId}`)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              Built for readers and creators
            </p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Discover powerful stories and share your own voice.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              Browse fresh articles, follow trending categories, and start writing with an easy author experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center sm:justify-start">
              <button
                onClick={handleExplore}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-3 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
              >
                Explore Articles
              </button>
              <button
                onClick={handleStartWriting}
                className="inline-flex items-center justify-center rounded-2xl border border-blue-600 px-8 py-3 text-blue-600 hover:bg-blue-50 transition"
              >
                Start Writing
              </button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">✍️ Write Blog Posts</h2>
                <p className="mt-3 text-gray-500">
                  Publish ideas, build your portfolio, and grow your author profile.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">📚 Read the Best</h2>
                <p className="mt-3 text-gray-500">
                  See the newest content from authors across every category.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">🤝 Connect</h2>
                <p className="mt-3 text-gray-500">
                  Grow your audience by sharing stories people care about.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Featured today</p>
              <h2 className="text-3xl font-bold text-gray-900">Start with great content.</h2>
              <p className="text-gray-600">
                The homepage now gives visitors immediate access to real articles and clear actions to sign in, register, or publish.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap gap-3">
            {["Technology", "Lifestyle", "Business", "Health", "Travel"].map((category) => (
              <span
                key={category}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        <section id="latest-articles" className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Latest articles</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">Fresh reads from the community</h2>
            </div>
            <p className="text-sm text-gray-500">
              {articles.length} articles available
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {loading && (
              <div className="col-span-full rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                Loading latest articles...
              </div>
            )}

            {error && (
              <div className="col-span-full rounded-3xl bg-white p-10 text-center text-red-500 shadow-sm">
                {error}
              </div>
            )}

            {!loading && !error && articles.length === 0 && (
              <div className="col-span-full rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">
                No articles are published yet.
              </div>
            )}

            {!loading &&
              !error &&
              articles.map((article) => (
                <div
                  key={article._id}
                  className="flex flex-col justify-between rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                      {article.category || "General"}
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold text-gray-900">{article.title}</h3>
                    <p className="mt-4 text-gray-600 line-clamp-3">
                      {article.content}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {article.author?.firstName || "Author"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(article.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleReadFull(article._id)}
                      className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Read full
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home