import { FC } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useTodoListQuery } from "queries";

type Props = {
  status: "done" | "undone";
};

export const TodoList: FC<Props> = ({ status }) => {
  const { data, isLoading } = useTodoListQuery({ status });

  if (isLoading)
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <List>
      {data?.map(({ id, description, status }) => (
        <ListItemButton key={id}>
          <ListItemIcon>
            <Checkbox checked={status} disableRipple />
          </ListItemIcon>
          <ListItemText primary={description} />
        </ListItemButton>
      ))}
    </List>
  );
};
