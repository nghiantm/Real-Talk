import React, { useEffect } from "react";
import { ButtonBase, Menu, MenuItem, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@material-tailwind/react";
import { logout } from "../../firebase";

const DropMenu = () => {
    const styles = {
        inactiveText: {
            color: '#ffffff',
            transition: 'color 0.3s ease',
            "&:hover": {
                color: '#000'
            }
        },
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (e) => {
        logout();
        <Navigate to="/" />
    }

    return (
        <>
            <ButtonBase 
                onClick={handleOpenNavMenu}
                sx={styles.button}
            >
                <MenuIcon sx={styles.inactiveText}/>
            </ButtonBase>

            <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                <MenuItem 
                    onClick={handleCloseNavMenu}
                >
                    <Button onClick={handleLogout}>Log out</Button>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DropMenu;