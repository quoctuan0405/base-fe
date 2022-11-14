import {
  createTheme,
  Palette,
  PaletteColor,
  PaletteOptions,
  SimplePaletteColorOptions,
  ThemeOptions,
} from '@mui/material/styles';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { red } from '@mui/material/colors';
import { RootState } from '../store';
import { deepmerge } from '@mui/utils';

export interface ThemeState {
  theme: ThemeOptions;
}

const initialState: ThemeState = {
  theme: {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#d32f2f',
      },
      warning: {
        main: '#ed6c02',
      },
      info: {
        main: '#0288d1',
      },
      success: {
        main: '#2e7d32',
      },
    },
  },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColorsWithThrottle: (state, action: PayloadAction<string[]>) => {},
    setThemeColors: (state, action: PayloadAction<string[]>) => {
      const colors = action.payload;

      if (colors.length === 6) {
        state.theme = deepmerge(state.theme, {
          palette: {
            primary: {
              main: colors[0],
            },
            secondary: {
              main: colors[1],
            },
            error: {
              main: colors[2],
            },
            warning: {
              main: colors[3],
            },
            info: {
              main: colors[4],
            },
            success: {
              main: colors[5],
            },
          },
        });
      }
    },
    toggleDarkMode: (state) => {
      if (state.theme.palette!.mode === 'dark') {
        state.theme.palette!.mode = 'light';
      } else {
        state.theme.palette!.mode = 'dark';
      }
    },
  },
});

export const selectThemeColors = (state: RootState) => {
  const primaryGroup = state.theme.theme.palette!
    .primary as SimplePaletteColorOptions;

  const secondaryGroup = state.theme.theme.palette!
    .secondary as SimplePaletteColorOptions;

  const errorGroup = state.theme.theme.palette!
    .error as SimplePaletteColorOptions;

  const warningGroup = state.theme.theme.palette!
    .warning as SimplePaletteColorOptions;

  const infoGroup = state.theme.theme.palette!
    .info as SimplePaletteColorOptions;

  const successGroup = state.theme.theme.palette!
    .success as SimplePaletteColorOptions;

  return [
    primaryGroup.main,
    secondaryGroup.main,
    errorGroup.main,
    warningGroup.main,
    infoGroup.main,
    successGroup.main,
  ];
};

export const selectThemeOption = (state: RootState) => {
  return state.theme.theme;
};

export const { setThemeColorsWithThrottle, setThemeColors, toggleDarkMode } =
  themeSlice.actions;

export default themeSlice.reducer;
