// export const baseUrl = 'https://localhost:3443/';
// export const baseUrl = '/';
export const baseUrl = process.env.NODE_ENV === 'production' ? '/apis/' : 'https://localhost:3443/apis/';
export const imageUrl = process.env.NODE_ENV === 'production' ? '/' : 'https://localhost:3443/'