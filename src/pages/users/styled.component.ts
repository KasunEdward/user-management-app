import styled from "@emotion/styled";

interface ThemeProps {
  mode: string;
}

export const UsersContainer = styled.div<ThemeProps>`
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background: ${({ mode }) =>
    mode === "dark"
      ? "linear-gradient(90deg,rgb(82, 82, 88),rgb(2, 10, 31))"
      : "rgb(242, 245, 249)"};
`;

export const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 0;
`;
