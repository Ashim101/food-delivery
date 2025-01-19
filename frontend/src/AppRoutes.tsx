import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilepage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import RestraurantPage from "./pages/RestraurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <Homepage />
          </Layout>
        }
      />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout showHero={false}>
              <UserProfilepage />
            </Layout>
          }
        />
        <Route
          path="/restraurant"
          element={
            <Layout showHero={false}>
              <RestraurantPage />
            </Layout>
          }
        />
      </Route>
      <Route
        path="/details/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default AppRoutes;
