import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useDeleteAllTodosMutation } from "mutations";

export const DeleteAll = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useDeleteAllTodosMutation({
    onSuccess() {
      handleClose();
    },
  });

  return (
    <>
      <Button
        variant="text"
        sx={{ textDecoration: "underline" }}
        onClick={handleOpen}
      >
        Delete all tasks
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete all tasks?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => mutate()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
