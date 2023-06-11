import { FormEvent, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAddNewListItemMutation } from "mutations";

export const AddNewTodo = () => {
  const [description, setDescription] = useState("");
  const { mutate } = useAddNewListItemMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ description });
  };

  return (
    <Box display="flex" component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        type="submit"
        disabled={!description}
        sx={{ ml: 2, px: 4 }}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
};
