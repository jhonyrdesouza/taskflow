import { useState } from 'react';

export const useHandlePasswordIcon = () => {
  const [handlePassword, setHandlePassword] = useState(false);

  function togglePassword() {
    setHandlePassword((prev) => !prev);
  }

  const typeInput = handlePassword ? 'text' : 'password';

  return {
    handlePassword,
    togglePassword,
    typeInput,
  };
};
