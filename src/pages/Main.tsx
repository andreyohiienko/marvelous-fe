import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
import { AddNewTodo, DeleteAll, TodoList } from "components";

export const Main = () => {
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
      <Grid container spacing={2} mt={4}>
        <Grid item md xs={12}>
          <AddNewTodo />
          <TodoList listStatus="undone" />
        </Grid>
        <Grid item md xs={12}>
          <FormControl fullWidth>
            <TextField label="Search..." />
          </FormControl>
          <TodoList listStatus="done" limit={10} />
        </Grid>
      </Grid>
    </Container>
  );
};
