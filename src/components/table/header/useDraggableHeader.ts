import { MutableRefObject } from 'react';
import { Column, Header, ColumnOrderState, Table } from '@tanstack/react-table';
import _ from 'lodash';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
import { Entry } from '../../../redux/reducer/entry';

interface Props {
  header: Header<Entry, unknown>;
  table: Table<Entry>;
  ref: MutableRefObject<HTMLElement | undefined>;
}

export const useDraggableHeader = ({ header, table, ref }: Props) => {
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

  return { isOver, isDragging, dropRef, dragRef, previewRef };
};
