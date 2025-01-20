import { ButtonWrapper } from "./styled.component";
import { ReactNode } from "react";

interface ButtonStyledProps {
  outlined?: boolean;
  icon?: ReactNode;
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const ButtonStyled = (props: ButtonStyledProps) => {
  const { outlined, icon, color, children, onClick, type } = props;
  return (
    <ButtonWrapper
      variant={outlined ? "outlined" : "contained"}
      color={color ? color : "info"}
      onClick={onClick}
      type={type}
    >
      {icon}
      {children}
    </ButtonWrapper>
  );
};
export default ButtonStyled;
