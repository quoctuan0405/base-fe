import { TableCell, Box, Typography, Divider } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import _ from 'lodash';
import { useRef } from 'react';
import { useMergeRef } from '../../../hooks/useMergeRef';
import { Entry } from '../../../redux/reducer/entry';
import { useDraggableHeader } from './useDraggableHeader';

interface Props {
  headerContext: HeaderContext<Entry, unknown>;
  headerName: string;
}

export const SortableHeaderCell: React.FC<Props> = ({
  headerContext: { header, table },
  headerName,
}) => {
  const ref = useRef<HTMLElement>();

  const { isOver, isDragging, dropRef, dragRef, previewRef } =
    useDraggableHeader({ header, table, ref });

  const mergeRef = useMergeRef([ref, dropRef, previewRef]);

  return (
    <TableCell
      key={header.id}
      sx={{
        minWidth: header.getSize(),
        paddingRight: 0,
      }}
      ref={mergeRef}
    >
      <Box
        sx={{
          display: 'flex',
          opacity: isOver || isDragging ? 0.3 : 1,
          transition: 'opacity 0.1s',
        }}
      >
        <Typography fontWeight="bold">{headerName}</Typography>
        <Box
          sx={{ flexGrow: 1, cursor: 'grab' }}
          ref={(node: React.ReactElement) => dragRef(node)}
        />
        <Box
          sx={{
            cursor: 'col-resize',
            marginLeft: 'auto',
            paddingLeft: 0.5,
            paddingRight: 0.5,
            '&:hover': {
              '& hr': {
                border: 2,
              },
            },
          }}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        >
          <Divider orientation="vertical" light={true} />
        </Box>
      </Box>
    </TableCell>
  );
};
