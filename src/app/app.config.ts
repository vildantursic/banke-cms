export const config = {
  defaultImage: '../assets/images/default.jpg',
  defaultImageWhite: '../assets/images/white.jpg',
  defaultImageGray: '../assets/images/gray.jpg',
  emailRegex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  localStorageData: ['access_token', 'refresh_token', 'expires_in'],
  localStorageUserData: ['first_name', 'last_name', 'scope', 'username', 'image', 'email', 'permissions'],
};
