import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Lock } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { DraggablePaper } from './DraggablePaper';
import { ColorPickerDialogHeader } from './ColorPickerDialogHeader';

interface Props {
  colors: string[];
  open: boolean;
  handleClose: () => any;
  onChange: (colors: string[]) => any;
}

export const ColorPickerDialog: React.FC<Props> = ({
  open,
  handleClose,
  onChange,
  colors,
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [colorLock, setColorLock] = useState<boolean>(false);

  const toggleColorLock = () => {
    setColorLock(!colorLock);
  };

  const id = 'draggable-dialog-title';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={DraggablePaper}
      hideBackdrop={true}
      aria-labelledby={id}
    >
      <ColorPickerDialogHeader onClose={handleClose} id={id} />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs>
            <ColorPicker
              colorLock={colorLock}
              colors={colors}
              onChange={onChange}
              activeColorIndex={activeColorIndex}
              onActiveColorIndexChange={(activeColorIndex) =>
                setActiveColorIndex(activeColorIndex)
              }
            />
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                width: 50,
                height: 50,
                background: colors[activeColorIndex],
                marginTop: 3,
              }}
            />
            <IconButton
              sx={{
                marginTop: 1,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
              size="large"
              color={colorLock ? 'info' : 'inherit'}
              onClick={toggleColorLock}
            >
              <Lock />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
