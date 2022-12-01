import { TableCell, Checkbox } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { Person } from '../../../redux/reducer/person';

interface Props {
  cellContext: CellContext<Person, unknown>;
}

export const SelectCell: React.FC<Props> = ({ cellContext: { row, cell } }) => {
  return (
    <TableCell key={cell.id} padding="checkbox">
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        onClick={(event) => event.stopPropagation()}
      />
    </TableCell>
  );
};
