import { useState } from 'react';

export const useValidation = () => {
  const [errors, setErrors] = useState({
    usernameError: '',
    emailError: '',
    passwordError: '',
    repeatPasswordError: '',
  });

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateForm = (username: string, email: string, password: string, repeatPassword: string) => {
    let valid = true;
    let newErrors = {
      usernameError: '',
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
    };

    if (username.length < 8 || !/\d/.test(username)) {
      newErrors.usernameError = 'Username must be at least 8 characters long and contain a number';
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.emailError = 'Please enter a valid email address';
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.passwordError = 'Password must contain upper and lower case letters, numbers, special characters, and be at least 8 characters long';
      valid = false;
    }
    if (password !== repeatPassword) {
      newErrors.repeatPasswordError = 'Passwords must match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return { errors, validateForm };
};
