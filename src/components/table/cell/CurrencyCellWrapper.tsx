import React from 'react';
import { TableCell, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface Props {
  value: number;
}

export const CurrencyCellWrapper: React.FC<Props> = React.memo(({ value }) => {
  return (
    <TableCell>
      <Typography align="center">
        <NumericFormat
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={0}
          value={value}
        />
        <span> đ</span>
      </Typography>
    </TableCell>
  );
});
