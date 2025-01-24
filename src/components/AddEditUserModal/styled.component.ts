import styled from "@emotion/styled";
import{styled as materialStyled} from "@mui/material/styles";
import { Autocomplete, Dialog, TextField } from "@mui/material";

export const CustomDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
      "border-radius": "1rem", 
    },
    "& .MuiDialogContent-root": {
      "padding-top": "2.25rem",
    },
  }));

export const CustomTextField = styled(TextField)(() => ({
    "& .MuiInputBase-root": {
      "border-radius": "1rem"
    },
  }));

export const CustomAutoComplete = materialStyled(Autocomplete)(() => ({
    "& .MuiInputBase-root": {
      "border-radius": "1rem"
    },
  }));