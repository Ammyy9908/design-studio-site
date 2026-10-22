type P = { className?: string };

const base = { width: 20, height: 20, "aria-hidden": true, focusable: false } as const;

export const AppleIcon = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
  </svg>
);

export const WindowsIcon = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 5.1 10.4 4v7.2H3V5.1zm0 13.8 7.4 1.1v-7.1H3v6zm8.3 1.2L21 21.5v-8.6h-9.7v7.2zm0-16.2v7.3H21V2.5l-9.7 1.4z" />
  </svg>
);

export const DownloadIcon = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Logo = ({ className, id = "logo-g" }: P & { id?: string }) => (
  <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8b7bff" />
        <stop offset="1" stopColor="#5b3df5" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
    <rect x="8" y="8" width="10" height="10" rx="3" fill="#fff" opacity=".95" />
    <circle cx="20" cy="20" r="5.5" fill="#fff" opacity=".6" />
  </svg>
);
