import { useState, useCallback } from 'react';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(
    ({ length, includeUppercase, includeNumbers, includeSymbols }: PasswordOptions) => {
      let charset = "abcdefghijklmnopqrstuvwxyz";
      if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeNumbers) charset += "0123456789";
      if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let newPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
      }

      setPassword(newPassword);
      return newPassword;
    },
    []
  );

  const calculateStrength = useCallback((password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    return strength;
  }, []);

  return {
    password,
    generatePassword,
    calculateStrength,
  };
};