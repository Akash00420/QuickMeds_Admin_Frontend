// Only needed if password generation happens on the frontend.
// Ideally your backend generates and hashes the password server-side,
// and this file becomes unnecessary. Kept here in case you need a
// client-side fallback/preview.

export const generatePassword = (length = 10) => {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};