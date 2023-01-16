import React, { useState, useRef } from 'react';
import {
  Tooltip,
  IconButton,
  Dialog,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { EntryTable } from '../table';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { ColumnOrderMenu } from './ColumnOrderMenu';
import { MoneyDistributionVisibility } from './MoneyDistributionVisibility';
import { RecipientsVisibility } from './RecipientsVisibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEntryTableShortcut } from '../hooks/useShortcut';
import { HeaderMenu } from './HeaderMenu';

interface Props {
  table: Table<any>;
  rowSelection: RowSelectionState;
  recipientColumnsVisibility: boolean;
  setRecipientColumnsVisibility: (recipientColumnsVisibility: boolean) => void;
  moneyDistributionVisibility: boolean;
  setMoneyDistributionVisibility: (
    moneyDistributionVisibility: boolean
  ) => void;
}

export const EnterFullscreen: React.FC<Props> = ({
  table,
  rowSelection,
  recipientColumnsVisibility,
  setRecipientColumnsVisibility,
  moneyDistributionVisibility,
  setMoneyDistributionVisibility,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ref = useRef(null);

  useEntryTableShortcut({ table, ref });

  return (
    <>
      <Tooltip title="Toggle full screen">
        <IconButton onClick={handleClickOpen}>
          <FullscreenIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullScreen={true} open={open} onClose={handleClose} ref={ref}>
        <HeaderMenu
          table={table}
          rowSelection={rowSelection}
          moneyDistributionVisibility={moneyDistributionVisibility}
          setMoneyDistributionVisibility={setMoneyDistributionVisibility}
          recipientColumnsVisibility={recipientColumnsVisibility}
          setRecipientColumnsVisibility={setRecipientColumnsVisibility}
          fullScreenMode={true}
          handleExitFullscreen={handleClose}
        />
        <EntryTable table={table} rowSelection={rowSelection} />
      </Dialog>
    </>
  );
};
