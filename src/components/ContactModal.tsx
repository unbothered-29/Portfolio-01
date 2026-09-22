import React, { useState, useEffect } from "react";
import { X, Copy, Check, Send, Mail, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "../data/portfolioData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const emailAddress = "chauhanjessicaa27@gmail.com";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      setIsSuccess(false);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "" });
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/30 dark:bg-black/70 backdrop-blur-[16px] animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-lg rounded-[32px] bg-[#FAFAFA]/95 dark:bg-[#12101D]/[0.95] backdrop-blur-[32px] border border-[#D6CBFF] dark:border-white/15 shadow-[0_24px_80px_rgba(24,15,46,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 animate-in zoom-in-95 duration-200 text-[#34154E] dark:text-[#F5F3FA] font-sora"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 font-sora">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#583C7E]/75 dark:text-[#A19BAE]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Direct Inquiry</span>
            </div>
            <h3
              id="contact-modal-title"
              className="mt-2 font-fraunces text-2xl sm:text-3xl font-bold tracking-tight text-[#34154E] dark:text-[#F5F3FA]"
            >
              Let's <span className="font-fraunces italic font-normal text-[#583C7E] dark:text-[#C4B5FD]">talk.</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-[#34154E]/[0.05] dark:bg-white/10 hover:bg-[#34154E]/[0.1] dark:hover:bg-white/20 text-[#34154E] dark:text-[#F5F3FA] transition-colors focus-visible:outline-none cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>

        {/* Quick Email Copy Capsule */}
        <div className="mt-4 p-4 rounded-[20px] bg-white/60 dark:bg-white/[0.06] border border-white/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded-full bg-[#18171C] dark:bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#77747E] dark:text-[#A19BAE] block">
                Direct Email
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#18171C] dark:text-[#F5F3FA] truncate block">
                {emailAddress}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#18171C] dark:text-[#F5F3FA] bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:border-black/25 dark:hover:border-white/30 transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#77747E] dark:text-[#A19BAE]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Message Form or Success State */}
        {isSuccess ? (
          <div className="mt-6 p-6 rounded-[24px] bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center animate-in fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5 stroke-[2]" />
            </div>
            <h4 className="text-base font-medium text-[#18171C] dark:text-[#F5F3FA]">
              Message received
            </h4>
            <p className="mt-1.5 text-xs text-[#77747E] dark:text-[#A19BAE]">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#18171C] dark:text-[#A78BFA] hover:underline cursor-pointer"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#77747E] dark:text-[#A19BAE] mb-1.5"
              >
                Your Name
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                placeholder="Ada Lovelace"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/10 dark:border-white/12 text-sm text-[#18171C] dark:text-[#F5F3FA] placeholder:text-[#77747E]/60 dark:placeholder:text-[#A19BAE]/50 focus:bg-white dark:focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#A98BFF]/40 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#77747E] dark:text-[#A19BAE] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                placeholder="name@studio.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/10 dark:border-white/12 text-sm text-[#18171C] dark:text-[#F5F3FA] placeholder:text-[#77747E]/60 dark:placeholder:text-[#A19BAE]/50 focus:bg-white dark:focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#A98BFF]/40 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#77747E] dark:text-[#A19BAE] mb-1.5"
              >
                Project Scope / Message
              </label>
              <textarea
                id="inquiry-message"
                rows={3}
                required
                placeholder="Tell me a bit about your timeline, vision, or idea..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/10 dark:border-white/12 text-sm text-[#18171C] dark:text-[#F5F3FA] placeholder:text-[#77747E]/60 dark:placeholder:text-[#A19BAE]/50 focus:bg-white dark:focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#A98BFF]/40 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#18171C] dark:bg-[#8B5CF6] text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-black dark:hover:bg-[#7C3AED] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Social Links Bar */}
        <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/10 flex items-center justify-between text-xs text-[#77747E] dark:text-[#A19BAE]">
          <span>Follow along</span>
          <div className="flex gap-4">
            {SOCIAL_LINKS.filter(s => s.name !== "Email").slice(0, 3).map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#18171C] dark:hover:text-white transition-colors inline-flex items-center gap-0.5"
              >
                {link.name} <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
