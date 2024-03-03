import { useState, useEffect } from 'react';

interface UseInputProps {
  defaultValue: string | undefined;
  validationFn: (value: string | undefined) => boolean;
}

export function useInput({ defaultValue, validationFn }: UseInputProps) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  useEffect(() => {
    console.log(defaultValue);
  }, []);

  const handleInputChange = (text: string) => {
    setEnteredValue(text);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  const valueIsValid = validationFn(enteredValue);

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    setValue: setEnteredValue,
    hasError: didEdit && !valueIsValid
  };
}
