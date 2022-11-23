import {
  Table as MUITable,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Typography,
  Divider,
  TableBody,
  Switch,
  FormControl,
} from '@mui/material';
import {
  Column,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { HeaderCell } from './HeaderCell';

export interface Person {
  [key: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const Table = () => {
  const [data, setData] = useState<Person[]>([
    {
      id: 1,
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
    },
    {
      id: 2,
      firstName: 'tanner',
      lastName: 'miller',
      age: 43,
    },
    {
      id: 3,
      firstName: 'joe',
      lastName: 'dirte',
      age: 42,
    },
  ]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Person>();

    const columns = [
      columnHelper.accessor('id', {
        id: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('firstName', {
        id: 'firstName',
        header: 'First name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lastName', {
        id: 'lastName',
        header: 'Last name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('age', {
        id: 'age',
        header: 'Age',
        cell: (info) => info.getValue(),
      }),
    ];

    return columns;
  }, [data]);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => {
      return column.id as string;
    })
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder: columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <FormControl>
        <FormGroup>
          {table.getAllLeafColumns().map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={column.getIsVisible()}
                  onChange={() => {
                    column.toggleVisibility();
                  }}
                />
              }
              label={column.columnDef.header?.toString()}
            />
          ))}
        </FormGroup>
      </FormControl>
      <MUITable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderCell key={header.id} header={header} table={table} />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </>
  );
};
