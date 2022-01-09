// export const baseUrl = 'https://localhost:3443/';
// export const baseUrl = '/';
export const baseUrl = process.env.NODE_ENV === 'production' ? '/apis/' : 'https://localhost:3443/'