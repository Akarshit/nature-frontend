class TokenService {
  getLocalRefreshToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token?.refreshToken;
  }
  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token?.accessToken;
  }
  updateLocalAccessToken(accessToken) {
    const token = JSON.parse(localStorage.getItem('token'));
    token.accessToken = accessToken;
    localStorage.setItem('token', JSON.stringify(token));
  }
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  removeUser(user) {
    localStorage.removeItem('user');
  }
  removeToken() {
    localStorage.removeItem('token');
  }
}
export default new TokenService();
