'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    residence: '',
    nationality: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Form submitted successfully!');
        setFormData({
          fullName: '',
          residence: '',
          nationality: '',
          phoneNumber: '',
          email: '',
          password: '',
        });
      } else {
        setMessage('Failed to submit form. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 w-full max-w-5xl border border-gray-100">
        <div className="text-center mb-8 lg:mb-10">
          <img
            src="/Kira_main_logo.png"
            alt="Kira Logo"
            className="mx-auto mb-6 h-20 sm:h-24 lg:h-28 w-auto"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Registration
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
          {/* Personal Information Section */}
          <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Personal Information
            </h2>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-blue-400"
              />
            </div>
          </section>

          {/* Residence and Nationality - Side by Side on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Residence Section */}
            <section className="space-y-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                Residence Details
              </h2>
              <div>
                <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-2">
                  Residence *
                </label>
                <input
                  type="text"
                  id="residence"
                  name="residence"
                  value={formData.residence}
                  onChange={handleChange}
                  required
                  placeholder="Enter your residence"
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-purple-400"
                />
              </div>
            </section>

            {/* Nationality Section */}
            <section className="space-y-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                Nationality
              </h2>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  placeholder="Enter your nationality"
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-green-400"
                />
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <section className="space-y-4 bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:p-6 rounded-xl border border-orange-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-orange-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-orange-400"
                />
              </div>
            </div>
          </section>

          {/* Password Section */}
          <section className="space-y-4 bg-gradient-to-r from-red-50 to-rose-50 p-4 sm:p-6 rounded-xl border border-red-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Security
            </h2>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 sm:py-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 hover:border-red-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 sm:py-5 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${message.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
