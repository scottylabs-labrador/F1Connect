"use client"
// import { useFormState } from "react-dom"
// import { login } from "@/lib/actions"
// import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"

const LoginForm = () => {
    // const [state, formAction] = useFormState(login, undefined);
    // const router = useRouter();
    /* useEffect(() => {
         state?.success && router.push("/login");
    }, [state?.success, router]); */
    
    return(
        <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 pt-200">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Sign in to your account to continue</p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl">
                    {/* <form action={formAction} className="space-y-6"> */}
                    <form className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input 
                                type="text" 
                                id="email"
                                placeholder="Enter your email" 
                                name="email"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                placeholder="Enter your password" 
                                name="password"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>

                        {/* Error Message */}
                        {/* {state?.error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                {state.error}
                            </div>
                        )} */}

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
                        >
                            Login
                        </button>

                        {/* Register Link */}
                        <div className="text-center pt-4 border-t border-gray-800">
                            <Link 
                                href="/register"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Don't have an account? <span className="text-blue-400 font-semibold hover:text-blue-300">Register</span>
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Additional Links */}
                <div className="mt-6 text-center">
                    <Link 
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm