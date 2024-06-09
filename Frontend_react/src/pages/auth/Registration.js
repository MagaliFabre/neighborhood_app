import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Registration = ({ handleSuccessfulAuth }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/registrations", {
      user: {
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation
      }
    }, { withCredentials: true })
    .then(response => {
      if (response.data.status === "created") {
        handleSuccessfulAuth(response.data);
        navigate("/dashboard");
      }
    })
    .catch(error => {
      console.log("registration error", error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email Address" 
            name="email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={userData.email} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={userData.password} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Confirm Password" 
            name="passwordConfirmation" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={userData.passwordConfirmation} 
            onChange={handleChange} 
            required 
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Registration;

// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button, Box } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';


// axios.get('http://localhost:3000/registrations', { withCredentials: true })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


// function Registration() {
//   const [userData, setUserData] = useState({
//     email: '',
//     password: '',
//     passwordConfirmation: '',
//     // firstName: '',
//     // lastName: '',
//     // phone: '',
//     // birthdate: '',
//     // streetAddress: '',
//     // city: '',
//     // state: '',
//     // country: '',
//     // latitude: '',  // Vous pourriez vouloir calculer ceci côté backend.
//     // longitude: '',  
//   });

//   let navigate = useNavigate();

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post("http://localhost:3000/registrations", {
//       user: {
//         email: userData.email,
//         password: userData.password,
//         password_confirmation: userData.passwordConfirmation
//       }
//     },
//       { withCredentials: true }
//     )
//       .then(response => {
//         if (response.data.status === "created") {
//           this.props.handleSuccessfulAuth(response.data);
//           navigate("/dashboard")
//         }
//       })

//       .catch(error => {
//         console.log("registration error", error);
//       });
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={4}>
//         <Typography variant="h4" gutterBottom>
//           Sign Up
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           {/* Ajout des champs pour le formulaire */}
//           <TextField label="Email Address" name="email" variant="outlined" fullWidth margin="normal" value={userData.email} onChange={handleChange} required />
//           <TextField label="Password" name="password" type="password" variant="outlined" fullWidth margin="normal" value={userData.password} onChange={handleChange} required />
//           <TextField label="Confirm Password" name="passwordConfirmation" type="password" variant="outlined" fullWidth margin="normal" value={userData.passwordConfirmation} onChange={handleChange} required />
//           {/* <TextField label="First Name" name="firstName" variant="outlined" fullWidth margin="normal" value={userData.firstName} onChange={handleChange} />
//           <TextField label="Last Name" name="lastName" variant="outlined" fullWidth margin="normal" value={userData.lastName} onChange={handleChange} />
//           <TextField label="Phone Number" name="phone" variant="outlined" fullWidth margin="normal" value={userData.phone} onChange={handleChange} />
//           <TextField label="Birthdate" name="birthdate" type="date" variant="outlined" fullWidth margin="normal" value={userData.birthdate} onChange={handleChange} />
//           <TextField label="Street Address" name="streetAddress" variant="outlined" fullWidth margin="normal" value={userData.streetAddress} onChange={handleChange} />
//           <TextField label="City" name="city" variant="outlined" fullWidth margin="normal" value={userData.city} onChange={handleChange} />
//           <TextField label="State" name="state" variant="outlined" fullWidth margin="normal" value={userData.state} onChange={handleChange} />
//           <TextField label="Country" name="country" variant="outlined" fullWidth margin="normal" value={userData.country} onChange={handleChange} /> */}
//           <Button type="submit" variant="contained" color="primary">
//             Sign Up
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Registration;