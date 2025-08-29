'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import { QRCodeSlide } from '@/components/QRCodeSlide'

const Login = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {}

        if (!formData.email) {
            newErrors.email = 'อีเมลเป็นสิ่งจำเป็น'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
        }

        if (!formData.password) {
            newErrors.password = 'รหัสผ่านเป็นสิ่งจำเป็น'
        } else if (formData.password.length < 6) {
            newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        // Mock API call - simulate network delay
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

                            // Mock validation - you can change these credentials
                if (formData.email === 'admin@example.com' && formData.password === '123456') {
                    // Use AuthContext to login
                    login({
                        id: 1,
                        email: formData.email,
                        name: 'Admin User',
                        avatar: '/avatar-placeholder.svg'
                    })

                // Redirect to home page
                router.push('/')
            } else {
                setErrors({
                    password: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
                })
            }
        } catch (error) {
            setErrors({
                password: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-violet-950 via-black to-indigo-950 flex items-center justify-center p-4 relative">
            <div className="max-w-md w-full space-y-6 z-10">
                <div className="relative">
                    <div className="bg-gradient-to-br from-violet-950 via-black/30 to-indigo-950 rounded-2xl p-8 animate-pulse-shadow">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="flex items-center gap-1.5 cursor-pointer"
                        >
                            <Icon icon="icon-park-outline:dog" className="w-10 h-10 lg:w-10 lg:h-10 text-white" />
                            <span className="text-3xl font-bold text-white">kube</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-0 focus:ring-indigo-600 focus:border-indigo-600 transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white'
                                }}
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white'
                                    }}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className=" w-full flex justify-center py-2.5 px-4  rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" style={{animationDuration: '0.5s'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    {/* <div className="mt-6 p-4rounded-lg">
                        <p className="text-xs text-gray-500">
                            อีเมล: <span className="font-mono">admin@example.com</span><br />
                            รหัสผ่าน: <span className="font-mono">123456</span>
                        </p>
                    </div> */}

                    <div className="w-full h-px bg-white/10 my-6 border border-dashed border-white/10"></div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="bg-black/30 border border-white/10 rounded-full p-2 flex items-center justify-center gap-2 w-full">
                            <Icon icon="logos:google-icon" className="w-5 h-5 text-white" />
                            <span className='text-white'>Google</span>
                        </div>
                        <div className="bg-black/30 border border-white/10 rounded-full p-2 flex items-center justify-center gap-2 w-full">
                            <Icon icon="logos:facebook" className="w-5 h-5 text-white" />
                            <span className='text-white'>Facebook</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register
                            </a>
                        </p>

                        <p className="text-xs text-gray-600 mt-3">
                            By continuing, you agree to kube's <span className="text-indigo-600 hover:text-indigo-500 underline cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 hover:text-indigo-500 underline cursor-pointer">Privacy Policy</span>
                        </p>
                    </div>

                    {/* QR Code Slide Panel */}
                    <QRCodeSlide deviceInfo="Web App Login" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
