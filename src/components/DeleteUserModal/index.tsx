import {
  Backdrop,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
	Typography,
} from "@mui/material";
import ButtonStyled from "../ButtonStyled";
import { CustomDialog } from "./styled.component";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect, useState } from "react";
import {
  deleteUserRequest,
} from "../../services/slices/userSlice";

interface DeleteUserModalProps {
  open: boolean;
  handleClose: () => void;
  handleCancel?: () => void;
  id: string;
}

const DeleteUserModal = (props: DeleteUserModalProps) => {
  const { open, handleClose, id, handleCancel} = props;
  const [submitted, setSubmitted] = useState(false);
  const { loadingAddEdit } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submitted && !loadingAddEdit) {
      setSubmitted(false); // Reset the submitted state
      handleClose(); // Close the dialog
    }
  }, [submitted, loadingAddEdit, handleClose]);

  const handleDelete = () => {
    setSubmitted(true); // Mark the form as submitted
    dispatch(deleteUserRequest(id));
  };

  return (
    <CustomDialog open={open} onClose={handleClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
				<Typography>Are you sure you want to delete?</Typography>
        {loadingAddEdit && (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={loadingAddEdit}
          >
            <CircularProgress data-testid="circularProgress" color="inherit" />
          </Backdrop>
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <ButtonStyled onClick={handleDelete} data-testid="delete-confirm" color="error">
            Confirm
          </ButtonStyled>
          <ButtonStyled outlined onClick={handleCancel}>
            Cancel
          </ButtonStyled>
        </Box>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeleteUserModal;
