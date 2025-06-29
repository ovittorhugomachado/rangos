const Logo = () => {

    const theme = localStorage.getItem('theme')

    return (
            <img
                className="w-40"
                src={theme === 'dark' ? "../logo-dark.png" : "../logo.png"}
                alt="domus-logo"
            />
    )
}

export { Logo }