import styled from "@emotion/styled";
import { Dialog, TextField } from "@mui/material";

export const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      "border-radius": "1rem", // Customize the border radius here
    },
    "& .MuiDialogContent-root": {
      "padding-top": "1rem", // Customize the border radius here
    },
  }));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      "border-radius": "1rem", // Customize the border radius here
    },
  }));