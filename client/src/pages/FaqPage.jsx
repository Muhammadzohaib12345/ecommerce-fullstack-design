import React, { useState } from 'react';

const FaqPage = () => {
  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by clicking on the "Orders" link in the header or by visiting the "My Account" section. You will also receive an email with a tracking number once your order has shipped.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused products in their original packaging. Simply contact our support team or visit the returns portal on our website to generate a return label.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary depending on the destination. You can view the estimated shipping cost at checkout.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team via the "Contact Us" page, by emailing support@brand.com, or by calling our toll-free number at 1-800-123-4567. We are available 24/7.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-x py-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-center mb-10">Find answers to the most common questions about our service.</p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">Still have questions?</p>
          <a href="/contact" className="text-blue-600 font-medium hover:underline">Contact our support team</a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
