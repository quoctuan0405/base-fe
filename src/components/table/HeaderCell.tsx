import { TableCell, Box, Typography, Divider } from '@mui/material';
import {
  Column,
  flexRender,
  Header,
  ColumnOrderState,
  Table,
} from '@tanstack/react-table';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
import { Person } from '.';

interface Props {
  header: Header<Person, unknown>;
  table: Table<Person>;
}

export const HeaderCell: React.FC<Props> = ({ header, table }) => {
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
    drop: (draggedColumn: Column<Person>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);
    },
    hover: (draggedColumn: Column<Person>, monitor) => {
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

  return (
    <TableCell
      key={header.id}
      sx={{
        width: header.getSize(),
      }}
      ref={ref}
    >
      <Box
        sx={{
          display: 'flex',
          opacity: isOver || isDragging ? 0.3 : 1,
          transition: 'opacity 0.1s',
        }}
      >
        <Typography fontWeight="bold">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Typography>
        <Box
          sx={{ flexGrow: 1, cursor: 'grab' }}
          ref={(node: React.ReactElement) => dragRef(dropRef(previewRef(node)))}
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
