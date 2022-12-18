import React, { useState } from 'react';
import {
  Tooltip,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItem,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Table } from '@tanstack/react-table';
import {
  Entry,
  EntryField,
  selectColumnMapping,
} from '../../../redux/reducer/entry';
import { table } from 'console';
import { useAppSelector } from '../../../redux/hooks';

interface Props {
  table: Table<Entry>;
}

export const ColumnOrderMenu: React.FC<Props> = ({ table }) => {
  const columnMapping = useAppSelector(selectColumnMapping);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Show/Hide columns">
        <IconButton onClick={handleClick}>
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FormControl>
          <FormGroup>
            <MenuList>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <MenuItem
                    onClick={() => {
                      column.toggleVisibility();
                    }}
                    key={column.id}
                  >
                    <ListItemIcon>
                      <Checkbox checked={column.getIsVisible()} />
                    </ListItemIcon>
                    <ListItemText>
                      {columnMapping[column.id as EntryField]}
                    </ListItemText>
                  </MenuItem>
                );
              })}
            </MenuList>
          </FormGroup>
        </FormControl>
      </Menu>
    </>
  );
};
