import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <section className="bg-navy-800 text-white py-16">
        <div className="container-x text-center">
          <p className="text-accent-500 font-semibold tracking-[0.3em] uppercase text-sm">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Contact Us</h1>
          <p className="text-gray-300 mt-3 max-w-xl mx-auto">
            Questions about an order or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container-x py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-navy-800">Reach out</h2>
          <div className="w-16 h-1 bg-accent-500 mt-4 rounded-full" />
          <div className="space-y-5 mt-8">
            {[
              { label: 'Email', value: 'hello@shophub.com' },
              { label: 'Phone', value: '+1 (555) 010-1010' },
              { label: 'Address', value: '123 Fashion Ave, New York, NY 10001' },
            ].map((c) => (
              <div key={c.label}>
                <p className="text-sm text-accent-500 font-semibold uppercase tracking-widest">
                  {c.label}
                </p>
                <p className="text-navy-800 mt-1">{c.value}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-card space-y-4">
          {sent && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm">
              Thanks! We'll get back to you soon.
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
