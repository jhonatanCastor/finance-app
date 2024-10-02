import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Auth } from "../pages/Auth"
import { Layout } from "../components/Layout"
import { NotFound } from "../pages/NotFound"
import { NewTransaction } from "../pages/Transaction/New"
import { EditTransaction } from "../pages/Transaction/Edit"
import { Account } from "../pages/Account"
import { Transactions } from "../pages/Transaction/Transactions"

export const MainRoutes = () => {
    return (
        <Routes>
            <Route
                path="/signin"
                element={<Auth type="signin" />}
            />

            <Route
                path="/signup"
                element={<Auth type="signup" />}
            />

            <Route element={<Layout />}>
                <Route
                    index
                    element={<Home />}
                />

                <Route
                    path="/account"
                    element={<Account />}
                />

                <Route path="/transacoes">
                    <Route
                        index
                        element={<Transactions />}
                    />

                    <Route
                        path="nova"
                        element={<NewTransaction />}
                    />

                    <Route
                        path=":id/editar"
                        element={<EditTransaction />}
                    />
                </Route>
            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    )
}