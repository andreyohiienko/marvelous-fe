import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
import { AddNewTodo, DeleteAll, TodoList } from "components";
import { useSearch } from "context";

export const Main = () => {
  const [search, setSearch] = useSearch();
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
            <TextField
              label="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
          <TodoList listStatus="done" limit={10} />
        </Grid>
      </Grid>
    </Container>
  );
};
