"use client";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <a
        href="http://localhost:5000/auth/google"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Login with Google
      </a>
    </div>
  );
}
