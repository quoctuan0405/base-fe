import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../src/redux/hooks';
import { selectThemeColors } from '../src/redux/reducer/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from 'next-i18next';
import { StaticProps } from './_app';
import { AppBar } from '../src/components/appbar';
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { addTodo, removeTodos, selectTodos } from '../src/redux/reducer/todo';
import { Checkbox } from '@mui/material';
import { useHotkeys } from 'react-hotkeys-hook';
import { ActionTypes } from '../src/redux/action/type';

export default function IndexPage() {
  const [todo, setTodo] = useState<string>('');
  const [todosIndex, setTodosIndex] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const colors = useAppSelector(selectThemeColors);
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
    <div>
      <AppBar />
      <Box sx={{ padding: 2 }}>{t('hi')}</Box>
      <Box sx={{ display: 'flex', padding: 2 }}>
        {colors.map((color) => (
          <Paper
            key={color}
            sx={{
              background: color,
              width: 100,
              height: 100,
              marginRight: 2,
            }}
          />
        ))}
      </Box>
      <Box sx={{ padding: 2 }} ref={ref} tabIndex={-1}>
        <Card>
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
      </Box>
    </div>
  );
}

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'index'])),
    },
  };
}
