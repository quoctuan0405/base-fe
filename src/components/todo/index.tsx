import {
  Card,
  CardContent,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../../redux/action/type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTodo, removeTodos, selectTodos } from '../../redux/reducer/todo';

export const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todosIndex, setTodosIndex] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);

  const handleSelectTodo = (todoIndex: number) => {
    const index = todosIndex.indexOf(todoIndex);
    if (index === -1) {
      setTodosIndex([...todosIndex, todoIndex]);
    } else {
      const todosIndexClone = [...todosIndex];
      todosIndexClone.splice(index, 1);
      setTodosIndex(todosIndexClone);
    }
  };

  const deleteRef = useHotkeys(
    'delete',
    () => {
      dispatch(removeTodos(todosIndex));
      setTodosIndex([]);
    },
    [todosIndex]
  );

  const undoRef = useHotkeys('ctrl+z', () => {
    dispatch({ type: ActionTypes.TODO_UNDO });
  });

  const redoRef = useHotkeys('ctrl+shift+z', () => {
    dispatch({ type: ActionTypes.TODO_REDO });
  });

  const ref = useRef(null);

  useEffect(() => {
    deleteRef.current = ref.current;
    undoRef.current = ref.current;
    redoRef.current = ref.current;
  }, [ref.current]);

  const isChecked = (todoIndex: number) => {
    return todosIndex.indexOf(todoIndex) !== -1;
  };

  return (
    <Card ref={ref} tabIndex={-1}>
      <CardContent>
        <Typography variant="h6">Add to list</Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(addTodo(todo));
            setTodo('');
          }}
        >
          <TextField
            variant="standard"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </form>
        <List>
          {todos.map((todo, todoIndex) => (
            <ListItem
              key={todoIndex}
              disablePadding
              onClick={() => handleSelectTodo(todoIndex)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox checked={isChecked(todoIndex)} />
                </ListItemIcon>
                <ListItemText primary={todo} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
