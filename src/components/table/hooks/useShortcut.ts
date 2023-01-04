import React, { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../../../redux/action/type';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteEntry } from '../../../redux/reducer/entry';

interface Props {
  table: Table<any>;
  ref: React.MutableRefObject<any>;
}

export const useEntryTableShortcut = ({ table, ref }: Props) => {
  const dispatch = useAppDispatch();

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
    dispatch({ type: ActionTypes.ENTRY_UNDO });
  });

  const redoRef = useHotkeys('ctrl+shift+z', () => {
    dispatch({ type: ActionTypes.ENTRY_REDO });
  });

  useEffect(() => {
    escapeRef.current = ref.current;
    deleteRef.current = ref.current;
    undoRef.current = ref.current;
    redoRef.current = ref.current;
  }, [ref.current]);
};
