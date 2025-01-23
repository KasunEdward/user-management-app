
import styled from "@emotion/styled";

interface ThemeProps {
    mode: string;
  }

export const DashboardContainer = styled.div<ThemeProps>`
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background: ${({ mode }) =>
    mode === "dark"
      ? "linear-gradient(180deg,rgb(82, 82, 88),rgb(2, 10, 31))"
      : "rgb(242, 245, 249)"};
`;