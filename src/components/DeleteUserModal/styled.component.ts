import styled from "@emotion/styled";
import { Dialog} from "@mui/material";

export const CustomDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
      borderRadius: "1rem", 
    },
    "& .MuiDialogContent-root": {
      paddingTop: "1rem",
    },
  }));
