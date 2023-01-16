import { Tooltip, IconButton } from '@mui/material';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface Props {
  handleClose: () => any;
}

export const ExitFullscreen: React.FC<Props> = ({ handleClose }) => {
  return (
    <Tooltip title="Exit full screen">
      <IconButton onClick={handleClose}>
        <FullscreenExitIcon />
      </IconButton>
    </Tooltip>
  );
};
