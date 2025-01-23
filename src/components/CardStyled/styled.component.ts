import styled from "@emotion/styled";
import { blue, green, orange, red} from "@mui/material/colors";

const colorCode = {
  green: {
    primary: green[500],
    secondary: green[200],
  },
    blue:{
        primary:blue[500],
        secondary: blue[200],
    },
    red:{
        primary: red[500],
        secondary: red[200],
    },
    orange:{
        primary:orange[500],
        secondary:orange[200],
    }
};

interface StyledCardProps {
  color: keyof typeof colorCode;
}

export const StyledCard = styled.div<StyledCardProps>`
  box-shadow: rgba(159, 162, 191, 0.18) 0px 9px 16px,
    rgba(159, 162, 191, 0.32) 0px 2px 2px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 10px;
  overflow: hidden;
  padding: 22.5px;
  background: ${({ color }) =>
    `linear-gradient(${colorCode[color].primary}, ${colorCode[color].secondary})`};
`;

