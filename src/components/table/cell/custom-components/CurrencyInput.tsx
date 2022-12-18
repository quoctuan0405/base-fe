import React from 'react';
import { InputAttributes, NumericFormat } from 'react-number-format';

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const CurrencyInput = React.forwardRef<
  typeof NumericFormat<InputAttributes>,
  Props
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
    />
  );
});
