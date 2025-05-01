import { LoginContainer } from "../../components/login"

const LoginPage = () => {
    return (
        <main className=" w-full h-full flex justify-center items-center bg-[url(../bg-theme-light.png)] dark:bg-[url(../bg-theme-dark.jpg)] bg-cover bg-center">
            <LoginContainer />
        </main>
    )
}

export { LoginPage }