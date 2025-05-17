import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <Link
            to={"/login"}
            className="primary-button"
        >
            Login
        </Link>
    )
}

export { HomePage }