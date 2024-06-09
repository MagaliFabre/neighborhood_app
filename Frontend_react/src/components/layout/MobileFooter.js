import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'; // Importation de Link

function MobileFooter() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1000 }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/" 
      />
      <BottomNavigationAction
        label="Dashboard"
        icon={<DashboardIcon />}
        component={Link}
        to="/dashboard" 
      />
      <BottomNavigationAction
        label="Notifications"
        icon={<NotificationsIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default MobileFooter;
