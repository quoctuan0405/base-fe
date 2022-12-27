import { TableCell, Checkbox } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { Entry } from '../../../redux/reducer/entry';
import { MemoizedCheckboxCell } from './custom-components/CheckboxCell';

interface Props {
  cellContext: CellContext<Entry, unknown>;
}

export const SelectRowCellWrapper: React.FC<Props> = ({
  cellContext: { row, cell },
}) => {
  const toggleSelectHandler = useCallback(() => {
    return row.getToggleExpandedHandler();
  }, []);

  return (
    <MemoizedCheckboxCell
      selected={row.getIsSelected()}
      onChange={toggleSelectHandler}
    />
  );
};
