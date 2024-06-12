import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
        label="Dashboard"
        icon={<DashboardIcon />}
        component={Link}
        to="/dashboard" 
      />
      <BottomNavigationAction
        label="Post"
        icon={<AddCircleIcon />}
        component={Link}
        to="/new-help-request" 
      />
      <BottomNavigationAction
        label="Messages"
        icon={<MessageIcon />}
        component={Link}
        to="/messages" 
      />
      <BottomNavigationAction
        label="Notifications"
        icon={<NotificationsIcon />}
      />
    </BottomNavigation>
  );
}

export default MobileFooter;
