import { TableCell } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { Person } from '../../../redux/reducer/person';

interface Props {
  headerContext: HeaderContext<Person, unknown>;
}

export const EmptyHeader: React.FC<Props> = ({ headerContext: { header } }) => {
  return <TableCell key={header.id} padding="checkbox" />;
};
