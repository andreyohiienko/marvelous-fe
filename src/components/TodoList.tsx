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
import { useTodoUpdateMutation } from "mutations";

type Props = {
  listStatus: "done" | "undone";
  limit?: number;
};

export const TodoList: FC<Props> = ({ listStatus, limit }) => {
  const { data, isLoading } = useTodoListQuery({ status: listStatus, limit });
  const { mutate } = useTodoUpdateMutation();

  if (isLoading)
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <List>
      {data?.map(({ id, description, status }) => (
        <ListItemButton
          key={id}
          onClick={() => mutate({ id, status: !status })}
        >
          <ListItemIcon>
            <Checkbox checked={status} disableRipple />
          </ListItemIcon>
          <ListItemText primary={description} />
        </ListItemButton>
      ))}
    </List>
  );
};
