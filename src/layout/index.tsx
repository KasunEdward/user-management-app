import MenuBar from "../components/MenuBar";
import { Container } from "./styled.component";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    return (
        <>
       <MenuBar/>
        <Container>
        {children}
        </Container>
        </>
    );
}

export default Layout;