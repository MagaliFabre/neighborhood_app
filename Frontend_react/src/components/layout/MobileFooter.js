import React from 'react';
import { BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageIcon from '@mui/icons-material/Message';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Import de la nouvelle icône
import { Link } from 'react-router-dom';

function MobileFooter({ unreadMessages }) {
  const [value, setValue] = React.useState(0);

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
        icon={
          <Badge color="secondary" variant={unreadMessages ? 'dot' : 'standard'}>
            <MessageIcon />
          </Badge>
        }
        component={Link}
        to="/messages"
      />
      <BottomNavigationAction
        label="My post"
        icon={<AssignmentIcon />}
        component={Link}
        to="/my-help-requests" 
      />
    </BottomNavigation>
  );
}

export default MobileFooter;
