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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const colors = useAppSelector(selectThemeColors);

  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
  };

  const [data, setData] = useState<Person[]>([
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]);

  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.group({
      id: 'hello',
      header: () => <span>Hello</span>,
      // footer: props => props.column.id,
      columns: [
        columnHelper.accessor('firstName', {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor((row) => row.lastName, {
          id: 'lastName',
          cell: (info) => info.getValue(),
          header: () => <span>Last Name</span>,
          footer: (props) => props.column.id,
        }),
      ],
    }),
    columnHelper.group({
      header: 'Info',
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor('age', {
          header: () => 'Age',
          footer: (props) => props.column.id,
        }),
        columnHelper.group({
          header: 'More Info',
          columns: [
            columnHelper.accessor('visits', {
              header: () => <span>Visits</span>,
              footer: (props) => props.column.id,
            }),
            columnHelper.accessor('status', {
              header: 'Status',
              footer: (props) => props.column.id,
            }),
            columnHelper.accessor('progress', {
              header: 'Profile Progress',
              footer: (props) => props.column.id,
            }),
          ],
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
