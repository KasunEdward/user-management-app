import styled from "@emotion/styled";
import { Dialog, TextField } from "@mui/material";

export const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      "border-radius": "1rem", 
    },
    "& .MuiDialogContent-root": {
      "padding-top": "2rem",
    },
  }));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      "border-radius": "1rem"
    },
  }));