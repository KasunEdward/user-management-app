import styled from "@emotion/styled";
import { Dialog} from "@mui/material";

export const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      "border-radius": "1rem", 
    },
    "& .MuiDialogContent-root": {
      "padding-top": "1rem",
    },
  }));
