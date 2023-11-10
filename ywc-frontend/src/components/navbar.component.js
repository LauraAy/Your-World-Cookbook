import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
Avatar, Button, Tooltip, MenuItem }from '@mui/material';
import { MenuBook, BakeryDining }from '@mui/icons-material';
import LogoDarkBG from '../images/ywcLogoDarkBG.png'

const NavbarComponent = () => {
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const user = AuthService.getCurrentUser();
			if (user) {
				setCurrentUser(user);
				console.log(user)
				console.log(user.username)
			}
		}, []);

	const logOut = () => {
		AuthService.logout();
	};

	//app bar functions
	const pages = [
		{name: 'Your Recipes', link: '/user/recipes'},
		{name: 'All Recipes', link: '/recipes'},
		{name: 'Add Recipes', link: '/recipes/add'},
		{name: 'About YWC', link: '/about'}
	]

	const loginPages = [
		{name: 'Sign Up', link: '/register'},
		{name: 'Sign In', link: '/login'}
	]

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

	return (
    <AppBar position="static">
			<Container maxWidth="xl">
        <Toolbar disableGutters>
					{ currentUser ? (
					<>
						{/* <BakeryDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
						<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
							<img 
								src={LogoDarkBG} 
								alt="Logo with noodles inside a bowl that looks like a globe and the words Your World Cookbook."
								style={{ maxHeight: '120px', margin: '5px'}}
							/>
						</Box>
						<Typography
							variant="h4"
							component="a"
							href="/"
							sx={{
								mr: 1,
								display: { xs: 'none', md: 'flex' },
								fontWeight: 500,
								fontFamily: 'RachelBrown',
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Your World Cookbook
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						
							<IconButton
						
								size="inherit"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuBook sx={{ fontSize: "60px" }}/>
							</IconButton>
						
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.name} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											<Link to ={`${page.link}`} className="navbar-brand">
												{page.name} 
											</Link>
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h5"
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'RachelBrown',
								fontWeight: 500,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none'
							}}
						>
							Your World Cookbook
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									<Link style={{textDecoration: "none", color: "white"}} to={`${page.link}`} className="nav-link">
										<Typography variant="body1">
										{page.name}
										</Typography>
									</Link>
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<Button	
									onClick={handleOpenUserMenu}
									sx={{  my: 2, color: 'white', display: 'block'  }}
								>
									<Typography>{currentUser.username}</Typography>
								</Button>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
                <MenuItem onClick={handleCloseUserMenu}>
									<Link to ={`/profile`} className="navbar-brand">
										<Typography textAlign="center">Profile</Typography>
									</Link>
                </MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<a href={`/`} className="navbar-brand" onClick={logOut}>
										<Typography textAlign="center">Sign Out</Typography>
									</a>
                </MenuItem>
							</Menu>
						</Box>
					</>
					):(
					<>
						{/* <BakeryDining sx={{ mr: 1 }} /> */}
						<Typography
							variant="h4"
							component="a" 
							href="/"
							sx={{
							mr: 2,
							flexGrow: 1,
							display: 'flex',
							fontFamily: 'RachelBrown',
							fontWeight: 700,		
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
						>
							Your World Cookbook
						</Typography>
						<Box sx={{ flexGrow: 0 }}>
							{loginPages.map((page) => (
								<Button
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={{ 
										my: 2, 
										color: 'white', 
										display: 'inline'
									}}
								>
									<Link style={{textDecoration: "none", color: "white"}} to={`${page.link}`} className="nav-link">
										{page.name}
									</Link>
								</Button>
							))}
						</Box>
					</>
					)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent