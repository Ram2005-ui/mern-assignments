export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">UserManager</span> — Built
          with React, Express &amp; MongoDB
        </p>
      </div>
    </footer>
  );
}
