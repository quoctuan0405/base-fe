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
  moneyDistributionVisibility: boolean;
  setMoneyDistributionVisibility: (
    moneyDistributionVisibility: boolean
  ) => void;
}

export const MoneyDistributionVisibility: React.FC<Props> = ({
  moneyDistributionVisibility,
  setMoneyDistributionVisibility,
}) => {
  const { t } = useTranslation('common');

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={moneyDistributionVisibility}
            onClick={() => {
              setMoneyDistributionVisibility(!moneyDistributionVisibility);
            }}
          />
        }
        label={
          <Typography fontWeight="bold">{t('moneyDistribution')}</Typography>
        }
      />
    </FormControl>
  );
};
