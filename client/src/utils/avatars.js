// 3D Cartoon Avatar Presets for User Profiles
// Maps keys to high-quality 3D render images stored in the public assets directory

const AVATARS = {
  avatar1: { label: 'Alex (3D Male)' },
  avatar2: { label: 'Sophia (3D Female)' },
  avatar3: { label: 'Liam (3D Male Beard)' },
  avatar4: { label: 'Olivia (3D Female Bun)' },
  avatar5: { label: 'Ethan (3D Male Hoodie)' },
  avatar6: { label: 'Chloe (3D Female Blazer)' }
};

export const getAvatarSvg = (avatarKey) => {
  const key = AVATARS[avatarKey] ? avatarKey : 'avatar1';
  return `<img src="/avatars/${key}.png" alt="${getAvatarLabel(key)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" />`;
};

export const getAvatarLabel = (avatarKey) => {
  return AVATARS[avatarKey]?.label || 'Alex (3D Male)';
};

export const AVATAR_KEYS = Object.keys(AVATARS);

export default AVATARS;
