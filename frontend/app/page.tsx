"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Loader from "../components/Loader";
import Cookies from "js-cookie";
import { isValidPhoneNumber } from "../utils/dataMapper";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number in E.164 format (e.g. +14155551234).');
      return;
    }
    setLoading(true);

    try {
      const res = await api.post("/login", { phone_number: phoneNumber });
      localStorage.setItem("account_id", res.data.id);
      Cookies.set("account_id", res.data.id, { expires: 1 });
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-200 to-cyan-100">
      <div className="w-full max-w-md backdrop-blur-lg bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold shadow-md">
            ✦
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
            Square Loyalty Portal
          </h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-1">
          <div>
            <Input
              id="phone"
              type="tel"
              placeholder="+14155551234"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.trim())}
              required
              label="Phone Number (E.164 format)"
              error={error || undefined}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition active:scale-95"
          >
            {loading ? <Loader /> : 'Login'}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SquareLoyaltyPortal. All rights reserved.
        </p>
      </div>
    </div>
  )
}
