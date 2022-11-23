import { TableCell, Box, Typography, Divider } from '@mui/material';
import {
  Column,
  flexRender,
  Header,
  ColumnOrderState,
  Table,
} from '@tanstack/react-table';
import { useDrop, useDrag } from 'react-dnd';
import { Person } from '.';

interface Props {
  header: Header<Person, unknown>;
  table: Table<Person>;
}

export const HeaderCell: React.FC<Props> = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

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
        opacity: isOver ? 0.5 : 1,
        borderWidth: isOver ? 1 : null,
        borderColor: isOver ? 'secondary.main' : null,
        borderStyle: isOver ? 'dashed' : null,
      }}
      ref={dropRef}
    >
      <Box sx={{ display: 'flex' }} ref={previewRef}>
        <Typography fontWeight="bold">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Typography>
        <Box sx={{ flexGrow: 1, cursor: 'grab' }} ref={dragRef} />
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
