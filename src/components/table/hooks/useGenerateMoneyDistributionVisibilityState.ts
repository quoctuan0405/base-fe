import { useAppSelector } from '../../../redux/hooks';
import { selectAllMembers } from '../../../redux/reducer/entry';

export const useGenerateMoneyDistributionVisibilityState = () => {
  const members = useAppSelector(selectAllMembers);

  const getMoneyDistributionVisibility = (
    moneyDistributionVisibility: boolean
  ) => {
    const columnVisiblity: Record<string, boolean> = {};

    for (let member of members) {
      columnVisiblity[`money_distribution_${member.id}`] =
        moneyDistributionVisibility;
    }

    return columnVisiblity;
  };

  return getMoneyDistributionVisibility;
};
