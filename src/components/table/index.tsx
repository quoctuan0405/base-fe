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
  alpha,
  Toolbar,
  Tooltip,
} from '@mui/material';
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowData,
  RowSelection,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HeaderCell } from './HeaderCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deletePerson,
  selectAllPerson,
  updatePerson,
} from '../../redux/reducer/person';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../../redux/action/type';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import _ from 'lodash';

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
        onClick={(event) => event.stopPropagation()}
        size="small"
      />
    );
  },
};

export const Table = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllPerson);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Person>();

    const columns: ColumnDef<Person>[] = [
      {
        id: 'select',
        header: '',
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(event) => event.stopPropagation()}
          />
        ),
        size: 10,
      },
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
        size: 60,
      },
      {
        id: 'firstName',
        accessorKey: 'firstName',
        header: 'First name',
      },
      {
        id: 'lastName',
        accessorKey: 'lastName',
        header: 'Last name',
      },
      {
        id: 'age',
        accessorKey: 'age',
        header: 'Age',
      },
      columnHelper.display({
        id: 'actions',
        size: 70,
        header: () => (
          <IconButton color="success">
            <AddCircleIcon />
          </IconButton>
        ),
        cell: (cellContext) => {
          const { row } = cellContext;

          return (
            <IconButton
              color="error"
              onClick={(event) => {
                dispatch(deletePerson([row.index]));
                event.stopPropagation();
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      }),
    ];

    return columns;
  }, [data]);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => {
      return column.id as string;
    })
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder: columnOrder,
      rowSelection,
    },
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    defaultColumn,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        dispatch(updatePerson({ column: columnId, index: rowIndex, value }));
      },
    },
  });

  const [lastSelectedIndex, setLastSelectedIndex] = useState<number>(0);
  const selectedRowModel = table.getSelectedRowModel();

  const deleteRef = useHotkeys(
    'delete',
    () => {
      const selectedIndex: number[] = [];

      for (let row of selectedRowModel.flatRows) {
        selectedIndex.push(row.index);
      }

      dispatch(deletePerson(selectedIndex));
      table.resetRowSelection();
    },
    [selectedRowModel.flatRows]
  );

  const escapeRef = useHotkeys('esc', () => {
    table.resetRowSelection();
  });

  const undoRef = useHotkeys('ctrl+z', () => {
    dispatch({ type: ActionTypes.PERSON_UNDO });
  });

  const redoRef = useHotkeys('ctrl+shift+z', () => {
    dispatch({ type: ActionTypes.PERSON_REDO });
  });

  const ref = useRef(null);

  useEffect(() => {
    escapeRef.current = ref.current;
    deleteRef.current = ref.current;
    undoRef.current = ref.current;
    redoRef.current = ref.current;
  }, [ref.current]);

  const columnLabel = useCallback(
    (column: Column<Person>) => {
      if (column.id === 'actions') {
        return 'Actions';
      } else if (column.id === 'select') {
        return 'Select';
      } else {
        return column.columnDef.header?.toString();
      }
    },
    [columns]
  );

  return (
    <div ref={ref} tabIndex={-1}>
      <FormControl>
        <FormGroup>
          {table.getAllLeafColumns().map((column) => {
            return (
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
                label={columnLabel(column)}
              />
            );
          })}
        </FormGroup>
      </FormControl>
      <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Tooltip title="Column">
            <IconButton>
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <MUITable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.id === 'select') {
                  return <TableCell key={header.id} padding="checkbox" />;
                } else if (header.id === 'actions') {
                  return (
                    <TableCell key={header.id} padding="checkbox">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  );
                } else {
                  return (
                    <HeaderCell key={header.id} header={header} table={table} />
                  );
                }
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              sx={(theme) => ({
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                cursor: 'pointer',
                backgroundColor: row.getIsSelected()
                  ? alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    )
                  : null,
                transition: 'background-color 0.1s',
              })}
              onClick={(e) => {
                if (e.ctrlKey || e.shiftKey) {
                  if (e.ctrlKey) {
                    row.toggleSelected();
                    setLastSelectedIndex(row.index);
                  }

                  if (e.shiftKey) {
                    const newRowSelection: RowSelectionState =
                      _.clone(rowSelection);

                    if (lastSelectedIndex >= row.index) {
                      for (let i = row.index; i <= lastSelectedIndex; i++) {
                        newRowSelection[i] = true;
                      }
                    } else {
                      for (let i = lastSelectedIndex; i <= row.index; i++) {
                        newRowSelection[i] = true;
                      }
                    }

                    table.setRowSelection(newRowSelection);
                  }
                } else {
                  table.resetRowSelection();
                  row.toggleSelected();
                  setLastSelectedIndex(row.index);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => {
                if (
                  cell.column.id === 'select' ||
                  cell.column.id === 'actions'
                ) {
                  return (
                    <TableCell key={cell.id} padding="checkbox">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </div>
  );
};
