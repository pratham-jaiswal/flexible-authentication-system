const isNameValid = (email) => /^[a-zA-Z]+$/.test(email);
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPassEightChars = (password) => /^.{8,}$/.test(password);
const hasPassUpperCase = (password) => /[A-Z]/.test(password);
const hasPassLowerCase = (password) => /[a-z]/.test(password);
const hasPassNumber = (password) => /\d/.test(password);
const hasPassSymbol = (password) => /[@$!%*?&]/.test(password);
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);


export { isNameValid, isEmailValid, isPassEightChars, hasPassUpperCase, hasPassLowerCase, hasPassNumber, hasPassSymbol, isValidPassword };