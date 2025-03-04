'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Failed to submit form' }));
        throw new Error(error.detail || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24" role="main">
      <div className="max-w-2xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[var(--text-primary)]">Contact Us</h1>
          <p className="text-lg text-[var(--text-secondary)] text-center mb-12">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.header>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--card-border)]"
          aria-label="Contact form"
        >
          <div role="group" aria-labelledby="name-label">
            <label id="name-label" htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              minLength={2}
              maxLength={50}
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--text-secondary)] transition-colors"
              placeholder="Your name"
              aria-required="true"
            />
          </div>

          <div role="group" aria-labelledby="email-label">
            <label id="email-label" htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--text-secondary)] transition-colors"
              placeholder="your@email.com"
              aria-required="true"
              autoComplete="email"
            />
          </div>

          <div role="group" aria-labelledby="message-label">
            <label id="message-label" htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              rows={5}
              minLength={10}
              maxLength={1000}
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--text-secondary)] transition-colors resize-none"
              placeholder="Your message..."
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <motion.div
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-center"
            >
              <p>Message sent successfully! We'll get back to you soon.</p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              <p>There was an error sending your message. Please try again.</p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </main>
  );
}
