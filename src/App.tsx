import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { MainRoutes } from "./routes";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";
import { useTheme } from "./hooks/theme";

const App = () => {
    const { handleAuthenticateUser } = useAuth()
    const { handleInitTheme, theme } = useTheme()

    useEffect(() => {
        // Authenticate user using token saved in local storage
        handleAuthenticateUser()

        // Apply theme saved by user to local storage
        handleInitTheme()
    }, [])
    

    return (
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <MainRoutes />
        </ThemeProvider>
    )
}

export default App;