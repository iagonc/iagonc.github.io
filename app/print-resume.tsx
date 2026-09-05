'use client';

export default function PrintResume() {
  return (
    <button className="profile-text-link" onClick={() => window.print()}>
      Print / save PDF ↗
    </button>
  );
}
