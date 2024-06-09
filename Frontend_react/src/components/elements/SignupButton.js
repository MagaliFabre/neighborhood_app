import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Button onClick={handleSignupClick} variant="contained" color="primary">
      Sign Up
    </Button>
  );
};

export default SignupButton;
