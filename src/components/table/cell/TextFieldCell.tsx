import { TableCell, Checkbox, TextField } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Person } from '../../../redux/reducer/person';

interface Props {
  cellContext: CellContext<Person, unknown>;
}

export const TextFieldCell: React.FC<Props> = ({
  cellContext: {
    table,
    getValue,
    row: { index },
    column: { id },
  },
}) => {
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
    <TableCell>
      <TextField
        value={value}
        variant="outlined"
        onBlur={onBlur}
        onChange={(event) => setValue(event.target.value)}
        onClick={(event) => event.stopPropagation()}
        size="small"
      />
    </TableCell>
  );
};
