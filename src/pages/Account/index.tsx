import { useState } from "react"
import TextInput from "../../components/TextInput"
import { Container, Header, HeaderTitle, HeaderSubtitle, Body, Footer, Loading, HeaderDeleteAccount, HeaderInfo } from "./styles"
import { Button } from "../../components/Button"
import { ScaleLoader } from "react-spinners"
import { useTheme } from "styled-components"
import Alert from "../../components/Alert"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { deleteUser, updateUser } from "../../services/requests"
import { useAuth } from "../../hooks/auth"
import { setUser } from "../../redux/slices/authSlice"

export const Account = () => {
    const user = useAppSelector((state) => state.auth.user)

    const dispatch = useAppDispatch()

    const [loadingRequest, setLoadingRequest] = useState(false)
    const [nameValue, setNameValue] = useState(user?.name as string)
    const [emailValue, setEmailValue] = useState(user?.email as string)
    const [showAlert, setShowAlert] = useState({ type: "error", message: "", show: false })

    const { handleSignOut } = useAuth()
    const theme = useTheme()

    const handleUpdateAccount = async () => {
        setLoadingRequest(true)
        const request = await updateUser(nameValue, emailValue)
        setLoadingRequest(false)

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true })
        }

        if (request.data) {
            dispatch(setUser(request.data.user))
            setShowAlert({ type: "success", message: 'Informações alteradas com sucesso!', show: true })
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
            setLoadingRequest(true)

            // Delete user account and sign out
            await deleteUser()
            handleSignOut()

            setLoadingRequest(false)
        }
    }

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Minha Conta</HeaderTitle>
                    <HeaderSubtitle>Edite os dados da sua conta, e depois clique em salvar!</HeaderSubtitle>
                </HeaderInfo>

                <HeaderDeleteAccount>
                    <Button
                        onClick={handleDeleteAccount}
                        width="120px"
                        size="md"
                    >
                        Excluir conta
                    </Button>
                </HeaderDeleteAccount>
            </Header>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            {loadingRequest &&
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            }

            {!loadingRequest &&
                <>
                    <Body>
                        <TextInput
                            label="Seu nome"
                            placeholder="Ex: João da Silva"
                            value={nameValue}
                            onChange={e => setNameValue(e.target.value)}
                            borderRadius="sm"
                        />

                        <TextInput
                            label="Seu email"
                            placeholder="Ex: joao1090@gmail.com"
                            value={emailValue}
                            onChange={e => setEmailValue(e.target.value)}
                            borderRadius="sm"
                        />
                    </Body>

                    <Footer>
                        <Button onClick={handleUpdateAccount} size="md" width="110px">
                            Salvar
                        </Button>
                    </Footer>
                </>
            }
        </Container>
    )
}