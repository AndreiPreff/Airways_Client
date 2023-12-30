import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from 'app/auth/store/auth.selectors';


export default function Header({ pages }: { pages: string[] }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const authorized = useSelector(isAuthorizedSelector);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/shop"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AIRWAYS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {authorized ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ marginLeft: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        color="inherit"
                        component={NavLink}
                        to={`/${page.toLowerCase()}`}
                        sx={{
                          textDecoration: 'none',

                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <NavLink className="link" to="/sign-in" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" component="div" color="white">
                  Login
                </Typography>
              </NavLink>
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {authorized ? (
              <>
                {pages.map((page) => (
                  <Typography
                    key={page}
                    variant="h6"
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textDecoration: 'none',
                      margin: '0 10px',
                    }}
                    textAlign="center"
                    color="inherit"
                    component={NavLink}
                    to={`/${page.toLowerCase()}`}
                  >
                    {page}
                  </Typography>
                ))}
              </>
            ) : (
              <NavLink className="link" to="/sign-in" style={{ textDecoration: 'none' }} >
                <Typography variant="h6" component="div" color="white">
                  Login
                </Typography>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
