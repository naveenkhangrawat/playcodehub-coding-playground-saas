
import Link from 'next/link'
import React from 'react'

function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f]">
            <div className="bg-[#1a1a2e] border border-gray-800/50 shadow-lg rounded-lg p-8 max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8 13.086l7.793-7.793a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-200 mb-4">Payment Successful!</h1>
                <p className="mb-8 text-gray-400">
                    <span>Thank you for your purchase.</span> <br /> Your Lifetime Pro Membership is now active.
                </p>
                <Link
                    href={'/'}
                    className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                Go to Homepage
                </Link>
            </div>
        </div>
    )
}

export default PaymentSuccess