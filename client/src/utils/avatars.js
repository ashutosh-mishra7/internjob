// 6 Anime-style avatar SVGs for user profiles
// Each avatar is a unique character with distinct colors and style

const AVATARS = {
  avatar1: {
    label: 'Kai',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#6366f1"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><ellipse cx="40" cy="40" rx="4" ry="5" fill="#1e1b4b"/><ellipse cx="60" cy="40" rx="4" ry="5" fill="#1e1b4b"/><path d="M43 52 Q50 58 57 52" stroke="#1e1b4b" fill="none" stroke-width="2" stroke-linecap="round"/><path d="M25 30 Q30 5 50 15 Q70 5 75 30 Q65 25 50 28 Q35 25 25 30Z" fill="#1e1b4b"/><circle cx="38" cy="38" r="1.5" fill="white"/><circle cx="58" cy="38" r="1.5" fill="white"/></svg>`
  },
  avatar2: {
    label: 'Luna',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#ec4899"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><ellipse cx="40" cy="42" rx="4" ry="5" fill="#581c87"/><ellipse cx="60" cy="42" rx="4" ry="5" fill="#581c87"/><path d="M44 53 Q50 57 56 53" stroke="#581c87" fill="none" stroke-width="2" stroke-linecap="round"/><path d="M20 35 Q25 10 40 20 L35 30 Q40 15 50 18 Q60 15 65 30 L60 20 Q75 10 80 35 Q70 30 50 32 Q30 30 20 35Z" fill="#581c87"/><circle cx="38" cy="40" r="1.5" fill="white"/><circle cx="58" cy="40" r="1.5" fill="white"/><circle cx="70" cy="30" r="3" fill="#fbbf24"/><circle cx="30" cy="28" r="2" fill="#fbbf24"/></svg>`
  },
  avatar3: {
    label: 'Rex',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#10b981"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><ellipse cx="38" cy="40" rx="5" ry="6" fill="white"/><ellipse cx="62" cy="40" rx="5" ry="6" fill="white"/><circle cx="39" cy="41" r="3" fill="#064e3b"/><circle cx="63" cy="41" r="3" fill="#064e3b"/><path d="M42 54 Q50 60 58 54" stroke="#064e3b" fill="none" stroke-width="2.5" stroke-linecap="round"/><rect x="28" y="18" width="44" height="22" rx="8" fill="#064e3b"/><path d="M28 28 L22 18 L34 25Z" fill="#064e3b"/><path d="M72 28 L78 18 L66 25Z" fill="#064e3b"/></svg>`
  },
  avatar4: {
    label: 'Miko',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#f59e0b"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><line x1="34" y1="39" x2="44" y2="41" stroke="#78350f" stroke-width="3" stroke-linecap="round"/><line x1="56" y1="41" x2="66" y2="39" stroke="#78350f" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="44" r="3" fill="#78350f"/><circle cx="60" cy="44" r="3" fill="#78350f"/><ellipse cx="50" cy="55" rx="5" ry="3" fill="#78350f"/><path d="M22 32 Q30 8 50 18 Q70 8 78 32 Q68 28 50 30 Q32 28 22 32Z" fill="#78350f"/><circle cx="30" cy="45" r="5" fill="#fca5a5" opacity="0.5"/><circle cx="70" cy="45" r="5" fill="#fca5a5" opacity="0.5"/></svg>`
  },
  avatar5: {
    label: 'Zara',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#8b5cf6"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><ellipse cx="40" cy="41" rx="4" ry="5" fill="#312e81"/><ellipse cx="60" cy="41" rx="4" ry="5" fill="#312e81"/><circle cx="38" cy="39" r="1.5" fill="white"/><circle cx="58" cy="39" r="1.5" fill="white"/><path d="M45 53 L50 56 L55 53" stroke="#312e81" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 40 Q20 10 35 20 Q45 5 55 20 Q65 5 80 25 Q82 40 75 35 Q60 25 50 30 Q40 25 25 35 Q20 38 18 40Z" fill="#312e81"/><circle cx="50" cy="22" r="3" fill="#c084fc"/></svg>`
  },
  avatar6: {
    label: 'Bolt',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#ef4444"/><circle cx="50" cy="45" r="25" fill="#fde8d0"/><rect x="33" y="37" width="14" height="8" rx="4" fill="white"/><rect x="53" y="37" width="14" height="8" rx="4" fill="white"/><circle cx="40" cy="41" r="3" fill="#7f1d1d"/><circle cx="60" cy="41" r="3" fill="#7f1d1d"/><path d="M43 55 Q50 60 57 55" stroke="#7f1d1d" fill="none" stroke-width="2.5" stroke-linecap="round"/><path d="M25 28 Q35 5 50 15 Q65 5 75 28 L70 22 Q55 15 50 20 Q45 15 30 22Z" fill="#7f1d1d"/><path d="M48 10 L45 18 L52 15 L49 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"/></svg>`
  }
};

export const getAvatarSvg = (avatarKey) => {
  return AVATARS[avatarKey]?.svg || AVATARS.avatar1.svg;
};

export const getAvatarLabel = (avatarKey) => {
  return AVATARS[avatarKey]?.label || 'Kai';
};

export const AVATAR_KEYS = Object.keys(AVATARS);

export default AVATARS;
