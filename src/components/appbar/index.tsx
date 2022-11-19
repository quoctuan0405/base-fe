import { useTheme } from '@mui/material';
import {
  Translate,
  LightMode,
  DarkMode,
  Palette,
  AccountCircle,
  KeyboardArrowDown,
} from '@mui/icons-material';
import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  List,
  Divider,
  IconButton,
  buttonClasses,
  Menu,
  MenuItem,
} from '@mui/material';
import { Trans } from 'next-i18next';
import React, { useState } from 'react';
import { useLocale } from '../../hooks/useChangeLocale';
import { setNotification } from '../../redux/reducer/notification';
import {
  selectThemeColors,
  setThemeColorsWithThrottle,
  toggleDarkMode,
} from '../../redux/reducer/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ColorPickerDialog } from '../color-picker/ColorPickerDialog';

export const AppBar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const [locale, changeLocale] = useLocale();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const colors = useAppSelector(selectThemeColors);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLocale = () => {
    if (locale == 'en') {
      changeLocale('vi');
    } else {
      changeLocale('en');
    }
  };

  return (
    <>
      <Box>
        <MUIAppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Finance
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  startIcon={<List />}
                  onClick={() =>
                    dispatch(
                      setNotification({
                        message: 'This is a notification',
                        variant: 'success',
                      })
                    )
                  }
                >
                  <Trans i18nKey="index:addToCategory">Add to category</Trans>
                </Button>
              </Box>
              <Divider
                sx={{ ml: 2, mr: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <IconButton onClick={() => toggleLocale()}>
                  <Translate color="primary" />
                </IconButton>
                <IconButton onClick={() => dispatch(toggleDarkMode())}>
                  {theme.palette.mode === 'light' ? (
                    <LightMode color="primary" />
                  ) : (
                    <DarkMode color="primary" />
                  )}
                </IconButton>
                <IconButton onClick={handleClickOpen}>
                  <Palette color="primary" />
                </IconButton>
              </Box>
              <Divider
                sx={{ ml: 1, mr: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Button
                  size="large"
                  sx={{
                    [`& .${buttonClasses.endIcon} > *:nth-of-type(1)`]: {
                      fontSize: (theme) => theme.typography.h4.fontSize,
                    },
                  }}
                  startIcon={<KeyboardArrowDown color="primary" />}
                  endIcon={<AccountCircle color="primary" />}
                  onClick={handleMenu}
                  aria-controls="menu-appbar"
                >
                  Thanh
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Trans i18nKey="index:profile">Profile</Trans>
                  </MenuItem>
                  <MenuItem>
                    <Trans i18nKey="index:myAccount">My account</Trans>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </MUIAppBar>
      </Box>
      <ColorPickerDialog
        colors={colors}
        open={open}
        onChange={(colors) => dispatch(setThemeColorsWithThrottle(colors))}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
