import React, { useCallback } from 'react';

export function useFormValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const isEmail = /^\S+@\S+\.\S+$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());

    if (name === 'email' && !isEmail.test(value)) {
      setIsValid(false);
      setErrors({
        ...errors,
        [name]: 'Формат почты не соответствует шаблону: pochta@yandex.ru',
      });
    }
  };

  const defaultChange = useCallback(
    (inputs) => {
      const defaultValues = {};
      inputs.forEach((input) => {
        defaultValues[input.name] = input.value;
      });

      setValues({ ...values, ...defaultValues });
      setIsValid(false);
    },
    [values],
  );

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, defaultChange, errors, isValid, resetForm };
}
