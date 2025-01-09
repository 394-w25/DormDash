import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add this line
import HomePage from "../pages/HomePage"; // Ensure the case matches your file name

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;
