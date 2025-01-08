import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const AppRoutes = () => {
    return (

        <Routes >
            <Route path="/" element={<Layout><Homepage /></Layout>} />
            <Route path="/user-profile" element={<span>User Profile page</span>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
        </Routes>
    )
}

export default AppRoutes