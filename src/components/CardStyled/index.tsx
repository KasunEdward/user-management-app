import { Typography } from "@mui/material";
import { StyledCard} from "./styled.component";

interface CardStyledProps {
    title:string,
    value:number,
    color?: "green" |"blue" | "red"|"orange";
}
const CardStyled: React.FC<CardStyledProps> = ({ title, value,color }) => {
  return (
    <StyledCard color={color ||"green"}>
       <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
       <Typography variant="h4" gutterBottom>
        {value}
      </Typography>
    </StyledCard>
  );
}

export default CardStyled;