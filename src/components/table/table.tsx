import React, { useState } from 'react';
import {
  Table as MUITable,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  alpha,
} from '@mui/material';
import { flexRender, RowSelectionState, Table } from '@tanstack/react-table';
import _ from 'lodash';

interface Props {
  table: Table<any>;
  rowSelection: RowSelectionState;
}

export const EntryTable: React.FC<Props> = ({ table, rowSelection }) => {
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number>(0);

  return (
    <TableContainer sx={{ overflow: 'scroll', maxHeight: '100vh' }}>
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
  );
};
