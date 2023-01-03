import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import { Entry } from '../../../redux/reducer/entry';

interface Props {
  table: Table<Entry>;
  recipientColumnsVisibility: boolean;
  setRecipientColumnsVisibility: (recipientColumnsVisibility: boolean) => void;
}

export const RecipientsVisibility: React.FC<Props> = ({
  table,
  recipientColumnsVisibility,
  setRecipientColumnsVisibility,
}) => {
  const { t } = useTranslation('common');

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={recipientColumnsVisibility}
            onClick={() => {
              setRecipientColumnsVisibility(!recipientColumnsVisibility);
            }}
          />
        }
        label={<Typography fontWeight="bold">{t('recipients')}</Typography>}
      />
    </FormControl>
  );
};
