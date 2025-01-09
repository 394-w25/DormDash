import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add this line
import HomePage from "../pages/HomePage"; // Ensure the case matches your file name
import PostPage from "../pages/PostPage";

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post" element={<PostPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;
