import { useState } from 'react';
import { LoginPage } from './pages/login-page'
import { BsZoomIn } from "react-icons/bs";
import { BsZoomOut } from "react-icons/bs";

function App() {

    const [fontSize, setFontSize] = useState("text-sm");

    const increaseFontSize = () => {
        setFontSize("text-lg")
    };

    const decreaseFontSize = () => {
        setFontSize("text-sm")
    }

    return (
        <div className={`${fontSize} w-screen h-screen`}>
            <div className='absolute text-xl top-2 right-5 text-black dark:text-white'>
                <button 
                onClick={increaseFontSize}
                className={fontSize === "text-lg" ? "opacity-30" : "opacity-100 cursor-pointer"}>
                    <BsZoomIn />
                </button>
                <button 
                onClick={decreaseFontSize}
                className={fontSize === "text-sm" ? "opacity-30" : "opacity-100 cursor-pointer"}>
                    <BsZoomOut />
                </button>
            </div>
            <LoginPage />
        </div>
    )
}

export default App
