import { Container } from "./styled.component";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    return (
        <Container>
        {children}
        </Container>
    );
}

export default Layout;