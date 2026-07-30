"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDBPage() {
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  // Test 1: Read from database
  const testRead = async () => {
    setStatus("testing");
    setMessage("Fetching users from Supabase...");

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      setUsers(data || []);
      setStatus("success");
      setMessage(`✅ Successfully fetched ${data?.length || 0} users from database!`);
    } catch (err: any) {
      setStatus("error");
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  // Test 2: Insert a test user
  const testInsert = async () => {
    setStatus("testing");
    setMessage("Adding test user to Supabase...");

    try {
      const testUser = {
        clerk_user_id: `test_${Date.now()}`,
        email: `test${Date.now()}@flowchat.com`,
        name: "Test User",
        plan: "free",
      };

      const { data, error } = await supabase
        .from("users")
        .insert([testUser])
        .select();

      if (error) throw error;

      setStatus("success");
      setMessage(`✅ Test user inserted! ID: ${data?.[0]?.id}`);

      // Auto-refresh the list
      testRead();
    } catch (err: any) {
      setStatus("error");
      setMessage(`❌ Insert Error: ${err.message}`);
    }
  };

  // Test 3: Delete a user
  const testDelete = async (id: string) => {
    setStatus("testing");
    setMessage("Deleting user...");

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setStatus("success");
      setMessage(`✅ User deleted successfully!`);

      // Auto-refresh
      testRead();
    } catch (err: any) {
      setStatus("error");
      setMessage(`❌ Delete Error: ${err.message}`);
    }
  };

  // Auto-fetch on page load
  useEffect(() => {
    testRead();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            🧪 Supabase Connection Test
          </h1>
          <p className="text-gray-600">
            Test read/write operations on your Flowchat database
          </p>
        </div>

        {/* Status Card */}
        <div
          className={`rounded-2xl p-5 mb-6 border ${
            status === "success"
              ? "bg-green-50 border-green-200"
              : status === "error"
              ? "bg-red-50 border-red-200"
              : status === "testing"
              ? "bg-blue-50 border-blue-200"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {status === "testing" && (
              <svg
                className="animate-spin w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  className="opacity-75"
                />
              </svg>
            )}
            <p className="text-sm font-medium">
              {status === "idle" ? "Ready to test" : message}
            </p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={testRead}
            disabled={status === "testing"}
            className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            🔍 Test: Read Users
          </button>
          <button
            onClick={testInsert}
            disabled={status === "testing"}
            className="px-5 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
            style={{
              backgroundImage: "linear-gradient(135deg, #03856b, #04a085)",
            }}
          >
            ➕ Test: Insert User
          </button>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Users in Database
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "rgba(3, 133, 107, 0.1)",
                color: "#03856b",
              }}
            >
              {users.length} rows
            </span>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No users yet.</p>
              <p className="text-xs mt-1">
                Click "Insert User" to add a test row
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name || "No name"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 truncate">
                      ID: {user.id}
                    </p>
                  </div>
                  <button
                    onClick={() => testDelete(user.id)}
                    className="ml-3 px-3 py-1 rounded-full text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-900">
            <strong>💡 Note:</strong> This is a temporary test page. Delete it
            after verifying everything works. Table used:{" "}
            <code className="bg-white px-1.5 py-0.5 rounded">users</code>
          </p>
        </div>
      </div>
    </div>
  );
}