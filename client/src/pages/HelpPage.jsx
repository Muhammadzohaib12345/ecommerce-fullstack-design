import React from 'react';
import { Link } from 'react-router-dom';

const HelpPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for articles..." 
              className="w-full py-3 px-5 pr-12 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg className="w-6 h-6 text-gray-400 absolute right-4 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="container-x py-12">
        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Getting Started', desc: 'Learn how to create an account and start shopping.' },
            { title: 'Orders & Shipping', desc: 'Track your order, change address, and shipping info.' },
            { title: 'Payments & Refunds', desc: 'Payment methods, refund policies, and invoicing.' },
            { title: 'Account Settings', desc: 'Manage your profile, password, and notifications.' },
            { title: 'Returns & Exchanges', desc: 'How to return a product or exchange for another.' },
            { title: 'Security & Privacy', desc: 'How we protect your data and privacy settings.' },
          ].map((cat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{cat.title}</h3>
              <p className="text-gray-600 text-sm">{cat.desc}</p>
              <Link to="#" className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">Read more &rarr;</Link>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              How to track my order?
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              What payment methods do you accept?
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              How do I return a product?
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              I forgot my password, what should I do?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
