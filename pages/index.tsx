import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../src/redux/hooks';
import { selectThemeColors } from '../src/redux/reducer/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from 'next-i18next';
import { StaticProps } from './_app';
import { AppBar } from '../src/components/appbar';
import { Box, Paper } from '@mui/material';
import { TodoList } from '../src/components/todo';
import { Table } from '../src/components/table';
import { updateEntry } from '../src/redux/reducer/entry';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const colors = useAppSelector(selectThemeColors);

  return (
    <div>
      <AppBar />
      <Box sx={{ padding: 2 }}>{t('hi')}</Box>
      <Box sx={{ display: 'flex', padding: 2 }}>
        {colors.map((color) => (
          <Paper
            key={color}
            sx={{
              background: color,
              width: 100,
              height: 100,
              marginRight: 2,
            }}
          />
        ))}
      </Box>
      <Box sx={{ padding: 2 }}>
        <TodoList />
      </Box>
      <Box sx={{ padding: 2 }}>
        <Paper sx={{ padding: 2 }}>
          <Table />
        </Paper>
      </Box>
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
