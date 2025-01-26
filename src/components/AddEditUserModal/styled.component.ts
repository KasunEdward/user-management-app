import styled from "@emotion/styled";
import{styled as materialStyled} from "@mui/material/styles";
import { Autocomplete, Dialog, TextField } from "@mui/material";

export const CustomDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
      borderRadius: "1rem", 
    },
    "& .MuiDialogContent-root": {
      paddingTop: "2rem",
    },
  }));

export const CustomTextField = styled(TextField)(() => ({
    "& .MuiInputBase-root": {
      borderRadius: "1rem"
    },
  }));

export const CustomAutoComplete = materialStyled(Autocomplete)(() => ({
    "& .MuiInputBase-root": {
      borderRadius: "1rem"
    },
  }));