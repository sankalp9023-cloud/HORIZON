import React, { useState } from 'react';
import { contactData } from '../data/contact';
import { Mail, Check, Copy, ArrowUpRight, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, ReadCvIcon } from './Icons';
import { motion, useReducedMotion } from 'framer-motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSocialIcon = (name) => {
    switch (name) {
      case 'GitHub':
        return <GithubIcon className="w-4 h-4" />;
      case 'LinkedIn':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'X (Twitter)':
        return <TwitterIcon className="w-4 h-4" />;
      case 'Read.cv':
        return <ReadCvIcon className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header — Clean, natural, no numbered labels */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 pb-6 border-b border-[#1c1e28]"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f4f4f5] tracking-tight">
          Contact
        </h2>
        <p className="text-sm text-[#9ca3af] mt-2 max-w-xl">
          {contactData.subtext}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Card: Direct Contact & Mailer */}
        <div className="lg:col-span-6 rounded-2xl bg-[#0f1015] border border-[#1f212a] p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-[#f4f4f5] tracking-tight mb-3">
              {contactData.headline}
            </h3>
            
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-8">
              Whether you want to explore collaboration on a technical architecture, discuss an experimental product, or share a paper on spacetime, feel free to reach out.
            </p>
          </div>

          {/* Email Copy Pill */}
          <div className="p-4 rounded-xl bg-[#090a0d] border border-[#1a1c24] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-lg bg-[#14161f] border border-[#20222f] text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] font-mono uppercase text-zinc-500">Direct Email</span>
                <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate block">
                  {contactData.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-[#161720] hover:bg-[#20222c] border border-[#252836] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              
              <a
                href={`mailto:${contactData.email}`}
                className="px-3 py-2 rounded-lg bg-[#f4f4f5] hover:bg-white text-zinc-950 text-xs font-semibold font-mono tracking-wide transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Write</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Card: Social and External Links */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-[#0f1015] hover:bg-[#13151c] border border-[#1f212a] hover:border-[#2f3342] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-[#161720] border border-[#222432] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {getSocialIcon(social.name)}
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#f4f4f5] group-hover:text-white mb-0.5">
                  {social.name}
                </h4>
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  {social.handle}
                </p>
                <p className="text-xs text-[#9ca3af]">
                  {social.note}
                </p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
