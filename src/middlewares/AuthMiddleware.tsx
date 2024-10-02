import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { Loading } from "../components/Loading"
import { useAppSelector } from "../redux/hooks"

type Props = {
    children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
    const { authStatus } = useAppSelector(state => state.auth)

    if (authStatus == 'authenticated') {
        return children
    }

    if (authStatus == 'not_verified') {
        return <Loading />
    }

    return <Navigate to='/signin' />
}