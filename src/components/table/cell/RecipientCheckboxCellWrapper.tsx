import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { Entry, toggleRecipient } from '../../../redux/reducer/entry';
import { MemoizedCheckboxCell } from './custom-components/CheckboxCell';

interface Props {
  rowIndex: number;
  memberId: number;
  value: boolean;
}

export const RecipientCheckboxCellWrapper: React.FC<Props> = ({
  rowIndex,
  memberId,
  value,
}) => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(() => {
    dispatch(toggleRecipient({ index: rowIndex, value: memberId }));
  }, [value]);

  return <MemoizedCheckboxCell selected={value} onChange={onChange} />;
};
