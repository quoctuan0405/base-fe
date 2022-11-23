import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Props {
  children: React.ReactNode;
}

export const DnDWrapper: React.FC<Props> = (props) => {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
};
