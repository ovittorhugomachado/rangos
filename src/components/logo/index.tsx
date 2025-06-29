interface LogoProps {
    backgroundColorStore: string;
}

const Logo = ({ backgroundColorStore }: LogoProps) => {

    return (
            <img
                className="w-40"
                src={backgroundColorStore === 'black' ? "../logo-dark.png" : "../logo.png"}
                alt="domus-logo"
            />
    )
}

export { Logo }