import * as React from 'react';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
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
import { useTranslation } from 'next-i18next';
import { useLocale } from '../src/hooks/useChangeLocale';
import { ColorPickerDialog } from '../src/components/color-picker/ColorPickerDialog';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button, { buttonClasses } from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Palette from '@mui/icons-material/Palette';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Translate from '@mui/icons-material/Translate';
import { StaticProps } from './_app';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const theme = useTheme();
  const colors = useAppSelector(selectThemeColors);
  const [locale, changeLocale] = useLocale();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
              <Divider
                sx={{ ml: 1, mr: 1 }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Button
                size="large"
                sx={{
                  [`& .${buttonClasses.endIcon} > *:nth-of-type(1)`]: {
                    fontSize: (theme) => theme.typography.h4.fontSize,
                  },
                }}
                startIcon={<KeyboardArrowDownIcon color="primary" />}
                endIcon={<AccountCircle color="primary" />}
              >
                Thanh
              </Button>
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
