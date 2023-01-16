import { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Collapse,
  Typography,
  Button,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ColumnOrderMenu } from './ColumnOrderMenu';
import { MoneyDistributionVisibility } from './MoneyDistributionVisibility';
import { RecipientsVisibility } from './RecipientsVisibility';
import { EnterFullscreen } from './EnterFullscreen';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { ExitFullscreen } from './ExitFullscreen';

interface Props {
  table: Table<any>;
  rowSelection: RowSelectionState;
  fullScreenMode?: boolean;
  recipientColumnsVisibility: boolean;
  setRecipientColumnsVisibility: (recipientColumnsVisibility: boolean) => void;
  moneyDistributionVisibility: boolean;
  setMoneyDistributionVisibility: (
    moneyDistributionVisibility: boolean
  ) => void;
  handleExitFullscreen?: () => any;
}

export const HeaderMenu: React.FC<Props> = ({
  table,
  rowSelection,
  recipientColumnsVisibility,
  setRecipientColumnsVisibility,
  moneyDistributionVisibility,
  setMoneyDistributionVisibility,
  fullScreenMode,
  handleExitFullscreen,
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          marginTop: 2,
          marginBottom: 2,
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
            <IconButton onClick={() => setShowFilter(!showFilter)}>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
          {fullScreenMode ? (
            <ExitFullscreen
              handleClose={() => {
                if (handleExitFullscreen) {
                  handleExitFullscreen();
                }
              }}
            />
          ) : (
            <EnterFullscreen
              table={table}
              rowSelection={rowSelection}
              recipientColumnsVisibility={recipientColumnsVisibility}
              setRecipientColumnsVisibility={setRecipientColumnsVisibility}
              moneyDistributionVisibility={moneyDistributionVisibility}
              setMoneyDistributionVisibility={setMoneyDistributionVisibility}
            />
          )}
        </Box>
      </Box>
      <Collapse in={showFilter}>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            marginBottom: 2,
            marginRight: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={from}
              onChange={(value) => setFrom(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="From"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <Typography sx={{ margin: 'auto', marginLeft: 1, marginRight: 1 }}>
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={to}
              onChange={(value) => setTo(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="To"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <Button variant="outlined" sx={{ marginLeft: 2 }}>
            Apply
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
