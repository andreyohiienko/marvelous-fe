import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const App = () => (
  <Container>
    <Grid container spacing={2} mt={2}>
      <Grid item xs>
        <Typography variant="h4" component="h1">
          Marvelous
        </Typography>
      </Grid>
      <Grid item xs textAlign="right">
        <Button variant="text" sx={{ textDecoration: "underline" }}>
          Delete all tasks
        </Button>
      </Grid>
    </Grid>
    <Grid container spacing={2} mt={4}>
      <Grid item md xs={12}>
        <Box display="flex">
          <TextField fullWidth />
          <Button sx={{ ml: 2, px: 4 }} variant="contained">
            Add
          </Button>
        </Box>
        <List>
          {Array.from(Array(10).keys()).map((a) => (
            <ListItemButton key={a}>
              <ListItemIcon>
                <Checkbox checked={false} disableRipple />
              </ListItemIcon>
              <ListItemText primary="List item" />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid item md xs={12}>
        <FormControl fullWidth>
          <TextField label="Search..." />
        </FormControl>
        <List>
          {Array.from(Array(10).keys()).map((a) => (
            <ListItemButton key={a}>
              <ListItemIcon>
                <Checkbox checked disableRipple />
              </ListItemIcon>
              <ListItemText primary="List item" />
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  </Container>
);

export default App;
