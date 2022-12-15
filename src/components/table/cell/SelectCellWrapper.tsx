import { TableCell, Checkbox } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { Person } from '../../../redux/reducer/person';
import { MemoizedSelectCell } from './custom-components/SelectCell';

interface Props {
  cellContext: CellContext<Person, unknown>;
}

export const CheckboxCellWrapper: React.FC<Props> = ({
  cellContext: { row, cell },
}) => {
  const toggleSelectHandler = useCallback(() => {
    return row.getToggleExpandedHandler();
  }, []);

  return (
    <MemoizedSelectCell
      cellId={cell.id}
      selected={row.getIsSelected()}
      onChange={toggleSelectHandler}
    />
  );
};
