import { useReducer } from 'react';

// Validation rules using regular expressions
const validate = (name, value) => {
  switch (name) {
    case 'name':
      // Full name validation (one required space between first and last name)
      return /^[A-Za-z]+ [A-Za-z]+$/.test(value) ? '' : 'Name must contain one space and only letters';
    case 'username':
      return /^[a-zA-Z0-9_]{4,}$/.test(value) ? '' : 'Username must be at least 4 characters long and contain only letters, numbers, or underscores';
    case 'email':
      // Basic email validation regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
    case 'password':
      // Password must be 8 characters long, contain upper and lowercase letters, a number, and a special character
      return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value)
        ? '' 
        : 'Password must be 8 characters long, contain uppercase, lowercase, a number, and a special character';
    case 'confirmPassword':
      return '';
    default:
      return '';
  }
};

// Reducer for form state and validation error management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.payload,
        },
        errors: {
          ...state.errors,
          [action.field]: validate(action.field, action.payload),
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

// Custom Hook
const useFormValidation = (initialValues) => {
  const initialState = {
    values: initialValues,
    errors: {},
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'CHANGE_VALUE', field: name, payload: value });
  };

  // Perform full form validation on submit
  const validateForm = () => {
    const newErrors = {};
    Object.keys(state.values).forEach((field) => {
      const error = validate(field, state.values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return {
    values: state.values,
    errors: state.errors,
    handleChange,
    validateForm,
  };
};

export default useFormValidation;
