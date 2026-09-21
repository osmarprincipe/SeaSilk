"use client";
import { useState } from "react";
export function ContactForm() {
  const [preview, setPreview] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setPreview(true);
      }}
      className="rounded-2xl border border-sand bg-cream p-6 sm:p-10"
    >
      <h2 className="font-display text-2xl">A note to SeaSilk</h2>
      <p className="mt-3 text-sm leading-7 text-text-muted">
        Contact is coming soon. You can try the form below; your message will
        not be sent.
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Your name
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={100}
            className="mt-2 block min-h-12 w-full rounded border border-sand bg-ivory px-4"
          />
        </label>
        <label className="text-sm">
          Email address
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-2 block min-h-12 w-full rounded border border-sand bg-ivory px-4"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm">
        How can we help?
        <select
          name="topic"
          className="mt-2 block min-h-12 w-full rounded border border-sand bg-ivory px-4"
        >
          <option>Finding my shade</option>
          <option>Choosing a method</option>
          <option>Delivery & returns</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="mt-5 block text-sm">
        Your message
        <textarea
          required
          name="message"
          rows={5}
          maxLength={3000}
          className="mt-2 block w-full rounded border border-sand bg-ivory p-4"
        />
      </label>
      <button
        type="submit"
        className="mt-6 min-h-12 rounded bg-espresso px-7 text-xs uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-brown"
      >
        Preview message →
      </button>
      <p role="status" className="mt-4 text-sm leading-7 text-text-muted">
        {preview
          ? "Your message is ready. Sending is not available yet; nothing has been sent or saved."
          : "Please do not include payment details or other sensitive information."}
      </p>
    </form>
  );
}
