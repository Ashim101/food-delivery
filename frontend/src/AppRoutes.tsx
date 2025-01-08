import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilepage from "./pages/UserProfilepage";

const AppRoutes = () => {
    return (

        <Routes >
            <Route path="/" element={<Layout showHero={true}><Homepage /></Layout>} />
            <Route path="/user-profile" element={<Layout showHero={false}><UserProfilepage /></Layout>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
        </Routes>
    )
}

export default AppRoutes