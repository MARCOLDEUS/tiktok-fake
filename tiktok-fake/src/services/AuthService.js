import { loadFromStorage, saveToStorage } from '../utils/storage';

export const AuthService = {
  async login(email, password) {
    const users = await loadFromStorage('users') || [];
    return users.find(u => u.email === email && u.password === password) || null;
  },

  async register(newUser) {
    const users = await loadFromStorage('users') || [];
    users.push(newUser);
    await saveToStorage('users', users);
  },

  async deleteAccount(userId) {
    const users = await loadFromStorage('users') || [];
    const updatedUsers = users.filter(u => u.id !== userId);
    await saveToStorage('users', updatedUsers);
  }
};
