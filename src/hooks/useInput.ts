import { useState, useEffect } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface UseInputProps {
    defaultValue: string | undefined;
    validationFn: (value: string | undefined) => boolean;
}

export function useInput({ defaultValue, validationFn }: UseInputProps) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const handleInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
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
        setEnteredValue,
        setValue: setEnteredValue,
        hasError: !valueIsValid,
    };
}
