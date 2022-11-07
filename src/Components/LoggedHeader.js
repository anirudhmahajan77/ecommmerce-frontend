import React, { useEffect, useState } from 'react'
import styles from "../Style/Header.module.css";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { FiBook, FiLogOut, FiUser, FiShoppingCart, FiTool } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import axios from "../api/axios";
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

export default function LoggedHeader(props) {

  const [firstName, setFirstName] = useState("");
  const [imageId, setImageId] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const [admin, setAdmin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    localStorage.clear();
    navigate('/');
  }
  const nav = (toLink) => {
    navigate(toLink)
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("auth"));
    if(data.role === "[ROLE_ADMIN]"){
      setAdmin(true);
    }
    axios.get("/user", { headers: { "Authorization": data.token } }).then(
      (response) => {
        setFirstName(response.data.firstName);
        setImageId(response.data.imageId);
        setCartLength(response.data.cartLength);
      }
    ).catch((err) => {
      console.log("Logged Header Error")
    })
  },[]);

  const badgeStyle = {
    "& .MuiBadge-badge": {
      color: 'white',
      backgroundColor: '#191617',
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Tooltip title="My Cart">
        <Badge className={styles.mainMenuIcon} onClick={() => { nav("/cart") }} sx={badgeStyle} badgeContent={cartLength} color="secondary">
          <FiShoppingCart className={styles.menuIcon} />
        </Badge>
        </Tooltip>
        <Typography sx={{ minWidth: 100, marginRight:'-20px' }}>Hi, {firstName}</Typography>
        <Tooltip title="More Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar alt={firstName} src={`${process.env.REACT_APP_LOCAL_URL}/image/${imageId}`}>{firstName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
        </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { nav("/profile") }}>
          <ListItemIcon>
            <FiUser className={styles.menuIcon} />
          </ListItemIcon> My Profile
        </MenuItem>

        <MenuItem onClick={() => { nav("/address") }}>
          <ListItemIcon>
            <FiBook className={styles.menuIcon} />
          </ListItemIcon>
          Address
        </MenuItem>
        {admin?
          <>
          <Divider />
          <MenuItem onClick={() => { nav("/admin") }}>
          <ListItemIcon>
            <FiTool className={styles.menuIcon} />
          </ListItemIcon>
          Admin
        </MenuItem>
          </>:null}
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <FiLogOut className={styles.menuIcon} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
