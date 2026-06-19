/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": { content: "none" },
            "code::after": { content: "none" },

            "--tw-prose-body": "var(--color-neutral-800)",
            "--tw-prose-headings": "var(--color-neutral-900)",
            "--tw-prose-lead": "var(--color-neutral-700)",
            "--tw-prose-links": "var(--color-neutral-900)",
            "--tw-prose-bold": "var(--color-neutral-900)",
            "--tw-prose-counters": "var(--color-neutral-600)",
            "--tw-prose-bullets": "var(--color-neutral-400)",
            "--tw-prose-hr": "var(--color-neutral-300)",
            "--tw-prose-quotes": "var(--color-neutral-900)",
            "--tw-prose-quote-borders": "var(--color-neutral-300)",
            "--tw-prose-captions": "var(--color-neutral-700)",
            "--tw-prose-code": "var(--color-neutral-900)",
            "--tw-prose-pre-code": "var(--color-neutral-100)",
            "--tw-prose-pre-bg": "var(--color-neutral-900)",
            "--tw-prose-th-borders": "var(--color-neutral-300)",
            "--tw-prose-td-borders": "var(--color-neutral-200)",

            "--tw-prose-invert-body": "var(--color-neutral-200)",
            "--tw-prose-invert-headings": "var(--color-white)",
            "--tw-prose-invert-lead": "var(--color-neutral-300)",
            "--tw-prose-invert-links": "var(--color-white)",
            "--tw-prose-invert-bold": "var(--color-white)",
            "--tw-prose-invert-counters": "var(--color-neutral-400)",
            "--tw-prose-invert-bullets": "var(--color-neutral-600)",
            "--tw-prose-invert-hr": "var(--color-neutral-700)",
            "--tw-prose-invert-quotes": "var(--color-neutral-100)",
            "--tw-prose-invert-quote-borders": "var(--color-neutral-700)",
            "--tw-prose-invert-captions": "var(--color-neutral-400)",
            "--tw-prose-invert-code": "var(--color-white)",
            "--tw-prose-invert-pre-code": "var(--color-neutral-300)",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "var(--color-neutral-600)",
            "--tw-prose-invert-td-borders": "var(--color-neutral-700)",
          },
        },
      },
    },
  },
};
