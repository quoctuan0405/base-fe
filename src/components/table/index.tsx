import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  TableContainer,
  InputAdornment,
} from '@mui/material';
import {
  CellContext,
  Column,
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  HeaderContext,
  RowData,
  RowSelection,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { SortableHeaderCell } from './header/SortableHeaderCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  Entry,
  deleteEntry,
  selectAllEntries,
  updateEntry,
  selectColumnMapping,
  EntryField,
  selectAllMembers,
  Member,
  Category,
  selectAllCategories,
} from '../../redux/reducer/entry';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../../redux/action/type';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import _ from 'lodash';
import {
  DeleteCell,
  TextFieldCell,
  SelectRowCell,
  ReadonlyCell,
  DatePickerCell,
  CurrencyCell,
  SelectCell,
  StatusCell,
  RecipientCheckboxCell,
} from './cell';
import { EmptyHeader } from './header/EmptyHeader';
import { AddRowHeader } from './header/AddRowHeader';
import { ColumnOrderMenu } from './menu/ColumnOrderMenu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Trans, useTranslation } from 'next-i18next';
import { UnsortableHeaderCell } from './header/UnsortableHeaderCell';
import SearchIcon from '@mui/icons-material/Search';

export const Table: React.FC = () => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllEntries);
  const columnMapping = useAppSelector(selectColumnMapping);
  const members = useAppSelector(selectAllMembers);
  const categories = useAppSelector(selectAllCategories);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Entry>();

    const columns: ColumnDef<Entry, string | number | boolean>[] = [
      {
        id: EntryField.select,
        header: (headerContext) => (
          <EmptyHeader headerId={headerContext.header.id} />
        ),
        cell: (cellContext) => <SelectRowCell cellContext={cellContext} />,
        size: 10,
      },
      {
        id: EntryField.id,
        accessorKey: EntryField.id,
        header: (headerContext) => {
          return (
            <SortableHeaderCell
              headerContext={headerContext}
              headerName={t(columnMapping[EntryField.id])}
            />
          );
        },
        cell: (cellContext) => (
          <ReadonlyCell value={cellContext.cell.getValue()} />
        ),
        size: 60,
      },
      {
        id: EntryField.spendAt,
        accessorKey: EntryField.spendAt,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.spendAt])}
          />
        ),
        cell: (cellContext) => (
          <DatePickerCell
            value={cellContext.cell.getValue()}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 220,
      },
      {
        id: EntryField.description,
        accessorKey: EntryField.description,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.description])}
          />
        ),
        cell: (cellContext) => (
          <TextFieldCell
            value={cellContext.cell.getValue()}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 180,
      },
      ...members.map((member) => {
        return {
          id: `recipient_${member.id}`,
          accessorFn: (entry: Entry) =>
            entry.recipientIds.indexOf(member.id) !== -1,
          header: (
            headerContext: HeaderContext<Entry, string | number | boolean>
          ) => (
            <UnsortableHeaderCell
              headerContext={headerContext}
              headerName={member.name}
            />
          ),
          cell: (
            cellContext: CellContext<Entry, string | number | boolean>
          ) => (
            <RecipientCheckboxCell
              memberId={member.id}
              rowIndex={cellContext.row.index}
              value={cellContext.getValue() as boolean}
            />
          ),
          size: 90,
        };
      }),
      {
        id: EntryField.categoryId,
        accessorKey: EntryField.categoryId,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.categoryId])}
          />
        ),
        cell: (cellContext) => (
          <SelectCell
            options={categories}
            value={cellContext.cell.getValue() as Category['id']}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 180,
      },
      {
        id: EntryField.amount,
        accessorKey: EntryField.amount,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.amount])}
          />
        ),
        cell: (cellContext) => (
          <CurrencyCell
            value={cellContext.cell.getValue()}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 180,
      },
      {
        id: EntryField.spenderId,
        accessorKey: EntryField.spenderId,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.spenderId])}
          />
        ),
        cell: (cellContext) => (
          <SelectCell
            options={members}
            value={cellContext.cell.getValue() as Member['id']}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 180,
      },
      {
        id: EntryField.statusId,
        accessorKey: EntryField.statusId,
        header: (headerContext) => (
          <SortableHeaderCell
            headerContext={headerContext}
            headerName={t(columnMapping[EntryField.statusId])}
          />
        ),
        cell: (cellContext) => (
          <StatusCell
            value={cellContext.cell.getValue() as number}
            rowIndex={cellContext.row.index}
            columnId={cellContext.column.id}
          />
        ),
        size: 180,
      },
      columnHelper.display({
        id: EntryField.action,
        header: (headerContext) => (
          <AddRowHeader headerContext={headerContext} />
        ),
        cell: (cellContext) => (
          <DeleteCell
            rowId={cellContext.row.id}
            rowIndex={cellContext.row.index}
          />
        ),
        size: 50,
      }),
    ];

    return columns;
  }, [t, members]);

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

      dispatch(deleteEntry(selectedIndex));
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
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          marginTop: 2,
          marginBottom: 1.5,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography fontWeight="bold" color="GrayText">
                  Money Distribution
                </Typography>
              }
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography fontWeight="bold" color="GrayText">
                  Recipients
                </Typography>
              }
            />
          </FormControl>
          <TextField
            sx={{ marginLeft: 1, marginRight: 1, marginTop: 0.5 }}
            placeholder="Search"
            size="small"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <ColumnOrderMenu table={table} />
          <Tooltip title="Filters">
            <IconButton>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle full screen">
            <IconButton>
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <TableContainer sx={{ overflow: 'scroll' }}>
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
                    backgroundColor: row.getIsSelected()
                      ? alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        )
                      : theme.palette.action.hover,
                  },
                  userSelect: 'none',
                  cursor: 'pointer',
                  backgroundColor: row.getIsSelected()
                    ? alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
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
      </TableContainer>
    </div>
  );
};
