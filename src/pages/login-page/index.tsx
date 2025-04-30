const LoginContainer = () => {
    return (
        <>
            <main className="w-screen flex flex-col justify-center items-center">
                <img className="w-55" src="../logo.png" alt="domus-logo" />
                <div className="flex flex-col mt-[20px] mb-[20px] w-[90%] max-w-150 gap-2">
                    <input className="input" type="email" />
                    <input className="input" type="password" />
                </div>
                <a className="link" href="#">Esqueci minha senha</a>
                <a className="link" href="#">Criar conta</a>
            </main>
        </>
    )
}

export { LoginContainer }