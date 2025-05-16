const Logo = () => {
    return (
        <>
            <img
                className="w-35 hidden dark:block"
                src="../logo-white.png"
                alt="domus-logo"
            />
            <img
                className="w-35 block dark:hidden"
                src="../logo-black.png"
                alt="domus-logo"
            />
        </>
    )
}

export { Logo }