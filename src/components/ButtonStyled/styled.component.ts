import {styled as materialStyled} from "@mui/material";
import { Button } from "@mui/material";

export const ButtonWrapper = materialStyled(Button)`
  margin: 10px 0 0 10px;
  border-radius: 20px;
  svg {
    margin-right: 10px;
  }
`;
