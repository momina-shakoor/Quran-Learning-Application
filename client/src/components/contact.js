import React from "react";

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="bg-[#f3f5ef] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Get in touch
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            We’re here to help you get started.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Have a question about a course or need help finding your way around?
            Send us a message and we’ll be glad to hear from you.
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-950/10 bg-white p-5 sm:p-6">
            <p className="text-sm font-semibold text-[#12372a]">
              Marfat-ul-Quran
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              A welcoming space to learn, practice, and grow.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8">
          <h3 className="text-xl font-bold text-[#12372a]">
            Send us a message
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Fill out the form and we’ll be in touch.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                required
                placeholder="How can we help?"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="Write your message..."
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#12372a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:w-auto"
            >
              Send message
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
