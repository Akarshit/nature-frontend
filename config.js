export const dev = process.env.NODE_ENV !== 'production';
export const server = dev
  ? 'http://localhost:3000/api/v1'
  : 'https://reservenature.com/api/v1';
