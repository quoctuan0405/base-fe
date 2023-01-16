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
  VisibilityState,
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
  EditableCurrencyCell,
  SelectCell,
  StatusCell,
  RecipientCheckboxCell,
  CurrencyCell,
} from './cell';
import { EmptyHeader } from './header/EmptyHeader';
import { AddRowHeader } from './header/AddRowHeader';
import { ColumnOrderMenu } from './menu/ColumnOrderMenu';
import { Trans, useTranslation } from 'next-i18next';
import { UnsortableHeaderCell } from './header/UnsortableHeaderCell';
import SearchIcon from '@mui/icons-material/Search';
import { RecipientsVisibility } from './menu/RecipientsVisibility';
import { useGenerateRecipientVisibilityState } from './hooks/useGenerateRecipientVisibilityState';
import { useGenerateMoneyDistributionVisibilityState } from './hooks/useGenerateMoneyDistributionVisibilityState';
import { MoneyDistributionVisibility } from './menu/MoneyDistributionVisibility';
import { EntryTable } from './table';
import { ToggleFullscreen } from './menu/ToggleFullscreen';
import { useEntryTableShortcut } from './hooks/useShortcut';

export const Table: React.FC = () => {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllEntries);
  const columnMapping = useAppSelector(selectColumnMapping);
  const members = useAppSelector(selectAllMembers);
  const categories = useAppSelector(selectAllCategories);

  // Column definition
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
          <EditableCurrencyCell
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
      ...members.map((member) => ({
        id: `money_distribution_${member.id}`,
        accessorFn: (entry: Entry) => {
          if (entry.recipientIds.indexOf(member.id) === -1) {
            return 0;
          } else if (entry.recipientIds.length === 0) {
            return 0;
          } else {
            return entry.amount / entry.recipientIds.length;
          }
        },
        header: (
          headerContext: HeaderContext<Entry, string | number | boolean>
        ) => (
          <UnsortableHeaderCell
            headerContext={headerContext}
            headerName={member.name}
          />
        ),
        cell: (cellContext: CellContext<Entry, string | number | boolean>) => (
          <CurrencyCell value={cellContext.getValue() as number} />
        ),
        size: 150,
      })),
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

  // Column order
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => {
      return column.id as string;
    })
  );

  // Column visibility
  const generateRecipientVisibilityState =
    useGenerateRecipientVisibilityState();

  const generateMoneyDistributionVisibility =
    useGenerateMoneyDistributionVisibilityState();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    [EntryField.select]: false,
    ...generateRecipientVisibilityState(false),
    ...generateMoneyDistributionVisibility(false),
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [recipientColumnsVisibility, setRecipientColumnsVisibility] =
    useState<boolean>(false);
  const [moneyDistributionVisibility, setMoneyDistributionVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    setColumnVisibility({
      ...columnVisibility,
      ...generateRecipientVisibilityState(recipientColumnsVisibility),
    });
  }, [recipientColumnsVisibility]);

  useEffect(() => {
    setColumnVisibility({
      ...columnVisibility,
      ...generateMoneyDistributionVisibility(moneyDistributionVisibility),
    });
  }, [moneyDistributionVisibility]);

  // Create new table
  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder: columnOrder,
      rowSelection,
      columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  // Handling shortcut
  const ref = useRef(null);

  useEntryTableShortcut({ table, ref });

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
          <RecipientsVisibility
            recipientColumnsVisibility={recipientColumnsVisibility}
            setRecipientColumnsVisibility={setRecipientColumnsVisibility}
          />
          <MoneyDistributionVisibility
            moneyDistributionVisibility={moneyDistributionVisibility}
            setMoneyDistributionVisibility={setMoneyDistributionVisibility}
          />
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
          <ToggleFullscreen
            table={table}
            rowSelection={rowSelection}
            recipientColumnsVisibility={recipientColumnsVisibility}
            setRecipientColumnsVisibility={setRecipientColumnsVisibility}
            moneyDistributionVisibility={moneyDistributionVisibility}
            setMoneyDistributionVisibility={setMoneyDistributionVisibility}
          />
        </Box>
      </Box>
      <EntryTable table={table} rowSelection={rowSelection} maxHeight="90vh" />
    </div>
  );
};
