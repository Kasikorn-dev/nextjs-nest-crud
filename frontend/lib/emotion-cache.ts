import createCache from '@emotion/cache';

// สร้าง Emotion Cache
export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};
