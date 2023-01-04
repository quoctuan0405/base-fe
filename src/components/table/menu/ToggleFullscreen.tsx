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

export const ToggleFullscreen: React.FC<Props> = ({
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
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            marginTop: 2,
            marginBottom: 1.5,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <RecipientsVisibility
              recipientColumnsVisibility={recipientColumnsVisibility}
              setRecipientColumnsVisibility={setRecipientColumnsVisibility}
            />
            <MoneyDistributionVisibility
              moneyDistributionVisibility={moneyDistributionVisibility}
              setMoneyDistributionVisibility={setMoneyDistributionVisibility}
            />
            <TextField
              sx={{ marginLeft: 1, marginRight: 1, marginTop: 0.5 }}
              placeholder="Search"
              size="small"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <ColumnOrderMenu table={table} />
            <Tooltip title="Filters">
              <IconButton>
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exit full screen">
              <IconButton onClick={handleClose}>
                <FullscreenExitIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <EntryTable table={table} rowSelection={rowSelection} />
      </Dialog>
    </>
  );
};
