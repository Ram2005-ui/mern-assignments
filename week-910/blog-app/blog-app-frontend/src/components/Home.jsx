import React from "react";

function Home() {
  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to BlogApp
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          Discover, write, and share amazing articles with the world
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition">
            Explore Articles
          </button>
          <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-xl transition">
            Start Writing
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              ✍️ Write Blogs
            </h2>
            <p className="text-gray-500">
              Share your thoughts, ideas, and stories with a global audience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              📖 Read Content
            </h2>
            <p className="text-gray-500">
              Explore articles from different categories and creators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              🚀 Grow Audience
            </h2>
            <p className="text-gray-500">
              Build your presence and connect with readers worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;