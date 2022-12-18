import { TableCell, Box, Typography, Divider } from '@mui/material';
import {
  Column,
  flexRender,
  Header,
  ColumnOrderState,
  Table,
  HeaderContext,
} from '@tanstack/react-table';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
import { useMergeRef } from '../../../hooks/mergeRef';
import { Entry } from '../../../redux/reducer/entry';

interface Props {
  headerContext: HeaderContext<Entry, unknown>;
  headerName: string;
}

export const HeaderCell: React.FC<Props> = ({
  headerContext: { header, table },
  headerName,
}) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const ref = useRef<HTMLElement>();

  const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
  ): ColumnOrderState => {
    columnOrder.splice(
      columnOrder.indexOf(targetColumnId),
      0,
      columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
    );
    return [...columnOrder];
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'column',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: (draggedColumn: Column<Entry>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);
    },
    hover: (draggedColumn: Column<Entry>, monitor) => {
      const draggedColumnIndex = _.findIndex(columnOrder, (columnId) => {
        return columnId === draggedColumn.id;
      });

      const columnIndex = _.findIndex(columnOrder, (columnId) => {
        return columnId === column.id;
      });

      if (draggedColumnIndex === columnIndex) {
        return;
      }

      // Determine position of current component
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect!.right - hoverBoundingRect!.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX =
        (clientOffset as XYCoord).x - hoverBoundingRect!.left;

      // Dragging rightward
      if (draggedColumnIndex < columnIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging leftward
      if (draggedColumnIndex > columnIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'column',
    item: () => column,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

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
