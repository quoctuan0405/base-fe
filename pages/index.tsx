import * as React from 'react';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../src/redux/hooks';
import {
  selectThemeColors,
  setThemeColorsWithThrottle,
  toggleDarkMode,
} from '../src/redux/reducer/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from 'next-i18next';
import { useLocale } from '../src/hooks/useChangeLocale';
import { ColorPickerDialog } from '../src/components/color-picker/ColorPickerDialog';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button, { buttonClasses } from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Palette from '@mui/icons-material/Palette';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import List from '@mui/icons-material/List';
import Translate from '@mui/icons-material/Translate';
import { StaticProps } from './_app';
import { useSnackbar } from 'notistack';
import { setNotification } from '../src/redux/reducer/notification';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const colors = useAppSelector(selectThemeColors);
  const [locale, changeLocale] = useLocale();

  const [open, setOpen] = useState(false);

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
    <div>
      <Box>
        <AppBar position="static" color="transparent">
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
                  startIcon={<KeyboardArrowDownIcon color="primary" />}
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
        </AppBar>
      </Box>
      <div onClick={() => changeLocale('vi')}>{t('hi')}</div>
      <div>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: 100,
              height: 100,
              marginRight: 10,
            }}
          ></div>
        ))}
      </div>
      <ColorPickerDialog
        colors={colors}
        open={open}
        onChange={(colors) => dispatch(setThemeColorsWithThrottle(colors))}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
}

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'index'])),
    },
  };
}
