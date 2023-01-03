import { useAppSelector } from '../redux/hooks';
import { selectAllMembers } from '../redux/reducer/entry';

export const useGenerateRecipientVisibilityState = () => {
  const members = useAppSelector(selectAllMembers);

  const getRecipientVisibility = (recipientVisibility: boolean) => {
    const columnVisiblity: Record<string, boolean> = {};

    for (let member of members) {
      columnVisiblity[`recipient_${member.id}`] = recipientVisibility;
    }

    return columnVisiblity;
  };

  return getRecipientVisibility;
};
