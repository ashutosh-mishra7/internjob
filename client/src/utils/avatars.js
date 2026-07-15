// 6 Highly polished, modern human-style vector avatars for user profiles
// Using premium design system tokens and soft gradients

const AVATARS = {
  avatar1: {
    label: 'Alex (Glasses & Blue)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#0EA5E9"/><path d="M25 85 C25 72, 35 68, 50 68 C65 68, 75 72, 75 85 Z" fill="#1E293B"/><path d="M43 68 L50 78 L57 68 Z" fill="#F8FAFC"/><rect x="44" y="55" width="12" height="15" rx="3" fill="#FDBA74"/><circle cx="50" cy="42" r="21" fill="#FDBA74"/><path d="M30 38 C30 20, 70 20, 70 38 C70 28, 30 28, 30 38 Z" fill="#451A03"/><path d="M30 38 C32 30, 48 30, 48 35" stroke="#451A03" stroke-width="4" stroke-linecap="round"/><circle cx="43" cy="40" r="2" fill="#1E293B"/><circle cx="57" cy="40" r="2" fill="#1E293B"/><rect x="36" y="36" width="12" height="8" rx="2" stroke="#1E293B" stroke-width="2" fill="none"/><rect x="52" y="36" width="12" height="8" rx="2" stroke="#1E293B" stroke-width="2" fill="none"/><line x1="48" y1="40" x2="52" y2="40" stroke="#1E293B" stroke-width="2"/><path d="M45 52 Q50 56 55 52" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`
  },
  avatar2: {
    label: 'Sophia (Long Hair & Pink)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#EC4899"/><path d="M22 45 C15 65, 20 90, 32 90 C32 90, 68 90, 68 90 C80 90, 85 65, 78 45 C78 20, 22 20, 22 45 Z" fill="#1E1B4B"/><path d="M28 85 C28 72, 38 68, 50 68 C62 68, 72 72, 72 85 Z" fill="#F43F5E"/><path d="M45 68 C45 74, 55 74, 55 68 Z" fill="#FDBA74"/><rect x="45" y="55" width="10" height="15" fill="#FDBA74"/><circle cx="50" cy="42" r="20" fill="#FDBA74"/><path d="M28 40 C28 25, 72 25, 72 40 C68 30, 32 30, 28 40 Z" fill="#1E1B4B"/><path d="M28 40 C32 30, 48 30, 50 38 C52 30, 68 30, 72 40" stroke="#1E1B4B" stroke-width="2" fill="none"/><ellipse cx="43" cy="42" rx="2" ry="3" fill="#1E1B4B"/><ellipse cx="57" cy="42" rx="2" ry="3" fill="#1E1B4B"/><circle cx="39" cy="47" r="2.5" fill="#F43F5E" opacity="0.4"/><circle cx="61" cy="47" r="2.5" fill="#F43F5E" opacity="0.4"/><path d="M46 51 Q50 55 54 51" stroke="#1E1B4B" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`
  },
  avatar3: {
    label: 'Liam (Beard & Amber)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#F59E0B"/><path d="M26 85 C26 73, 36 68, 50 68 C64 68, 74 73, 74 85 Z" fill="#047857"/><rect x="44" y="56" width="12" height="14" fill="#E0A96D"/><circle cx="50" cy="42" r="20" fill="#E0A96D"/><path d="M30 42 C30 55, 70 55, 70 42 C70 60, 30 60, 30 42 Z" fill="#27272A"/><path d="M40 48 Q50 51 60 48 Q50 46 40 48 Z" fill="#27272A"/><path d="M30 36 C30 20, 70 20, 70 36 C70 28, 30 28, 30 36 Z" fill="#27272A"/><circle cx="43" cy="38" r="2" fill="#27272A"/><circle cx="57" cy="38" r="2" fill="#27272A"/><path d="M46 52 Q50 55 54 52" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`
  },
  avatar4: {
    label: 'Olivia (Bun & Purple)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#8B5CF6"/><circle cx="50" cy="22" r="16" fill="#18181B"/><circle cx="40" cy="26" r="12" fill="#18181B"/><circle cx="60" cy="26" r="12" fill="#18181B"/><path d="M26 85 C26 73, 36 68, 50 68 C64 68, 74 73, 74 85 Z" fill="#D946EF"/><rect x="45" y="55" width="10" height="15" fill="#A16207"/><circle cx="50" cy="42" r="20" fill="#A16207"/><path d="M30 38 C30 32, 70 32, 70 38" stroke="#18181B" stroke-width="4" fill="none"/><circle cx="43" cy="40" r="2" fill="#18181B"/><circle cx="57" cy="40" r="2" fill="#18181B"/><circle cx="38" cy="45" r="2" fill="#D946EF" opacity="0.4"/><circle cx="62" cy="45" r="2" fill="#D946EF" opacity="0.4"/><path d="M45 50 Q50 54 55 50" stroke="#18181B" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`
  },
  avatar5: {
    label: 'Ethan (Spiky Hair & Green)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#10B981"/><path d="M25 85 C25 72, 35 68, 50 68 C65 68, 75 72, 75 85 Z" fill="#3B82F6"/><rect x="44" y="55" width="12" height="15" fill="#FDBA74"/><circle cx="50" cy="42" r="21" fill="#FDBA74"/><path d="M28 35 L33 22 L38 25 L45 18 L50 24 L56 18 L62 25 L68 22 L72 35 Z" fill="#78350F"/><circle cx="43" cy="40" r="2.5" fill="#1E293B"/><circle cx="57" cy="40" r="2.5" fill="#1E293B"/><path d="M44 51 Q50 56 56 51" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`
  },
  avatar6: {
    label: 'Chloe (Blonde & Coral)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#F87171"/><path d="M22 45 C22 25, 78 25, 78 45 L78 75 L22 75 Z" fill="#FBBF24"/><path d="M28 85 C28 72, 38 68, 50 68 C62 68, 72 72, 72 85 Z" fill="#4B5563"/><rect x="45" y="55" width="10" height="15" fill="#FFD8A8"/><circle cx="50" cy="42" r="20" fill="#FFD8A8"/><path d="M28 40 C32 30, 68 30, 72 40" stroke="#FBBF24" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="42" cy="42" r="5" stroke="#1F2937" stroke-width="1.5" fill="none"/><circle cx="58" cy="42" r="5" stroke="#1F2937" stroke-width="1.5" fill="none"/><line x1="47" y1="42" x2="53" y2="42" stroke="#1F2937" stroke-width="1.5"/><circle cx="42" cy="42" r="1.5" fill="#1F2937"/><circle cx="58" cy="42" r="1.5" fill="#1F2937"/><path d="M46 51 Q50 55 54 51" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`
  }
};

export const getAvatarSvg = (avatarKey) => {
  return AVATARS[avatarKey]?.svg || AVATARS.avatar1.svg;
};

export const getAvatarLabel = (avatarKey) => {
  return AVATARS[avatarKey]?.label || 'Alex (Glasses & Blue)';
};

export const AVATAR_KEYS = Object.keys(AVATARS);

export default AVATARS;
