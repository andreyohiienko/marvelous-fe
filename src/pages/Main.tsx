import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { AddNewTodo, DeleteAll } from "components";
import { useTodoListQuery } from "queries";

export const Main = () => {
  const { data, isLoading } = useTodoListQuery();

  const render = () => {
    if (isLoading)
      return (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      );

    return (
      <Grid container spacing={2} mt={4}>
        <Grid item md xs={12}>
          <AddNewTodo />
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
        </Grid>
        <Grid item md xs={12}>
          <FormControl fullWidth>
            <TextField label="Search..." />
          </FormControl>
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
        </Grid>
      </Grid>
    );
  };

  return (
    <Container>
      <Grid container spacing={2} mt={2}>
        <Grid item xs>
          <Typography variant="h4" component="h1">
            Marvelous
          </Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <DeleteAll />
        </Grid>
      </Grid>

      {render()}
    </Container>
  );
};
