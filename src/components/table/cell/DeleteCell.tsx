import { TableCell, IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { deletePerson, Person } from '../../../redux/reducer/person';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../redux/hooks';

interface Props {
  cellContext: CellContext<Person, unknown>;
}

export const DeleteCell: React.FC<Props> = ({ cellContext: { row } }) => {
  const dispatch = useAppDispatch();

  return (
    <TableCell key={row.id} padding="checkbox">
      <IconButton
        color="error"
        onClick={(event) => {
          dispatch(deletePerson([row.index]));
          event.stopPropagation();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};
