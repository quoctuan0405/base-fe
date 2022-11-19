import * as React from 'react';
import MaterialReactTable, {
  MRT_Cell,
  MRT_FullScreenToggleButton,
  MRT_ShowHideColumnsButton,
} from 'material-react-table';
import type { MRT_ColumnDef } from 'material-react-table';
import { useAppDispatch, useAppSelector } from '../src/redux/hooks';
import { selectThemeColors } from '../src/redux/reducer/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from 'next-i18next';
import { StaticProps } from './_app';
import { AppBar } from '../src/components/appbar';
import { Box, IconButton, Paper } from '@mui/material';
import { TodoList } from '../src/components/todo';
import { useMemo, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const colors = useAppSelector(selectThemeColors);

  interface Person {
    [key: string]: any;
    id: number;
    name: string;
    age: number;
  }

  const [data, setData] = useState<Person[]>([
    {
      id: 1,
      name: 'John',
      age: 30,
    },
    {
      id: 2,
      name: 'Sara',
      age: 25,
    },
  ]);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        enableEditing: false,
        enableResizing: false,
        enableColumnDragging: false,
        size: 10,
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
    ],
    []
  );

  const saveCellData = (cell: MRT_Cell<Person>, value: any) => {
    data[cell.row.index][cell.column.id] = value;
    setData([...data]);
  };

  const addRow = () => {
    setData([{ id: 0, age: 0, name: '' }, ...data]);
  };

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
        <MaterialReactTable
          columns={columns}
          data={data}
          editingMode="table"
          enableEditing
          enableRowSelection
          enableColumnOrdering
          enableColumnResizing
          enableColumnActions={false}
          columnResizeMode="onChange"
          enableDensityToggle={false}
          enableGlobalFilter={false}
          positionActionsColumn="last"
          enableRowActions
          displayColumnDefOptions={{
            'mrt-row-actions': {
              Header: (
                <Box>
                  <IconButton onClick={addRow}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              ),
            },
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex' }}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          renderToolbarInternalActions={({ table }) => (
            <>
              <MRT_ShowHideColumnsButton table={table} />
              <MRT_FullScreenToggleButton table={table} />
            </>
          )}
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            onBlur: (event) => {
              saveCellData(cell, event.target.value);
            },
            variant: 'outlined',
            size: 'small',
          })}
        />
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
