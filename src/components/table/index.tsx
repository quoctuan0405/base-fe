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
  Person,
  deletePerson,
  selectAllPerson,
  updatePerson,
} from '../../redux/reducer/person';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../../redux/action/type';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import _ from 'lodash';
import { DeleteCell } from './cell/DeleteCell';
import { SelectCell } from './cell/SelectCell';
import { TextFieldCell } from './cell/TextFieldCell';
import { ReadonlyCell } from './cell/ReadonlyCell';
import React from 'react';
import { EmptyHeader } from './header/EmptyHeader';
import { AddRowHeader } from './header/AddRowHeader';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const Table = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllPerson);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Person>();

    const columns: ColumnDef<Person, string | number | boolean>[] = [
      {
        id: 'select',
        header: (headerContext) => (
          <EmptyHeader headerContext={headerContext} />
        ),
        cell: (cellContext) => <SelectCell cellContext={cellContext} />,
        size: 10,
      },
      {
        id: 'id',
        accessorKey: 'id',
        header: (headerContext) => (
          <HeaderCell headerContext={headerContext} headerName="ID" />
        ),
        cell: (cellContext) => <ReadonlyCell cellContext={cellContext} />,
        size: 60,
      },
      {
        id: 'firstName',
        accessorKey: 'firstName',
        header: (headerContext) => (
          <HeaderCell headerContext={headerContext} headerName="First name" />
        ),
        cell: (cellContext) => <TextFieldCell cellContext={cellContext} />,
      },
      {
        id: 'lastName',
        accessorKey: 'lastName',
        header: (headerContext) => (
          <HeaderCell headerContext={headerContext} headerName="Last name" />
        ),
        cell: (cellContext) => <TextFieldCell cellContext={cellContext} />,
      },
      {
        id: 'age',
        accessorKey: 'age',
        header: (headerContext) => (
          <HeaderCell headerContext={headerContext} headerName="Age" />
        ),
        cell: (cellContext) => <TextFieldCell cellContext={cellContext} />,
      },
      columnHelper.display({
        id: 'actions',
        size: 70,
        header: (headerContext) => (
          <AddRowHeader headerContext={headerContext} />
        ),
        cell: (cellContext) => <DeleteCell cellContext={cellContext} />,
      }),
    ];

    return columns;
  }, []);

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

  return (
    <div ref={ref} tabIndex={-1}>
      {/* <FormControl>
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
      </FormControl> */}
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
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </React.Fragment>
              ))}
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
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </div>
  );
};
