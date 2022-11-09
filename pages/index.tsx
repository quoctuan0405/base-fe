import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Box, Grid, Icon, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ColorPicker } from '../src/components/color-picker/ColorPicker';
import { useState } from 'react';
import { Lock } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../src/redux/hooks';
import {
  selectThemeColors,
  setThemeColorsWithThrottle,
} from '../src/redux/reducer/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useChangeLocale } from '../src/hooks/useChangeLocale';
import { ColorPickerDialog } from '../src/components/color-picker/ColorPickerDialog';
import { StaticProps } from './_app';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function DraggableDialog() {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const colors = useAppSelector(selectThemeColors);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const changeLocale = useChangeLocale();

  return (
    <div>
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button>
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
