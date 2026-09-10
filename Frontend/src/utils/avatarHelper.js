/**
 * Avatar Color Generator
 * Deterministically generates stylish, curated pastel backgrounds and border accents
 * for user and lead avatar initials.
 */

const AVATAR_PALETTES = [
  {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    ring: 'ring-emerald-500/20',
  },
  {
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    ring: 'ring-indigo-500/20',
  },
  {
    bg: 'bg-violet-50 text-violet-700 border-violet-200/80',
    ring: 'ring-violet-500/20',
  },
  {
    bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    ring: 'ring-blue-500/20',
  },
  {
    bg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    ring: 'ring-teal-500/20',
  },
  {
    bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    ring: 'ring-amber-500/20',
  },
  {
    bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    ring: 'ring-rose-500/20',
  },
  {
    bg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    ring: 'ring-cyan-500/20',
  },
];

export function getAvatarColor(name = '') {
  if (!name) return AVATAR_PALETTES[0].bg;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index].bg;
}

export function getInitials(name = '') {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
