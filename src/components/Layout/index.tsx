import { Outlet } from "react-router-dom"
import { AuthMiddleware } from "../../middlewares/AuthMiddleware"
import { BodyContent, NavbarContent, Container, Content } from "./styles"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

export const Layout = () => {
    return (
        <AuthMiddleware>
            <Container>
                <Sidebar />

                <Content>
                    <NavbarContent>
                        <Navbar />
                    </NavbarContent>

                    <BodyContent>
                        <Outlet />
                    </BodyContent>
                </Content>
            </Container>
        </AuthMiddleware>
    )
}