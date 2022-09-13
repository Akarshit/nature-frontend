export const dev = process.env !== 'production';
export const server = dev
  ? 'http://localhost:3000/api/v1'
  : 'https://reservenature/api/v1';
