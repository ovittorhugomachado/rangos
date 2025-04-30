import { LoginContainer } from "../../components/login"

const LoginPage = () => {
    return (
        <div className=" w-full h-full flex justify-center items-center bg-[url(../bg-theme-light.jpg)] dark:bg-[url(../bg-theme-dark.jpg)] bg-cover bg-center">
            <LoginContainer />
        </div>
    )
}

export { LoginPage }