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
  IconButton,
  TextField,
} from '@mui/material';
import {
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { HeaderCell } from './HeaderCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface Person {
  [key: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table, cell }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <TextField
        value={value}
        variant="outlined"
        onBlur={onBlur}
        onChange={(event) => setValue(event.target.value)}
        size="small"
      />
    );
  },
};

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
        size: 60,
      }),
      columnHelper.accessor('firstName', {
        id: 'firstName',
        header: 'First name',
      }),
      columnHelper.accessor('lastName', {
        id: 'lastName',
        header: 'Last name',
      }),
      columnHelper.accessor('age', {
        id: 'age',
        header: 'Age',
      }),
      columnHelper.display({
        id: 'actions',
        size: 70,
        header: () => (
          <IconButton color="success">
            <AddCircleIcon />
          </IconButton>
        ),
        cell: (props) => (
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        ),
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
    defaultColumn,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
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
              label={
                column.id === 'actions'
                  ? 'Actions'
                  : column.columnDef.header?.toString()
              }
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
