import { Route, Routes } from "react-router";
import ProtectRoute from "./components/features/ProtectRoute";
import Dashboard from "./components/pages/Dashboard";
import AddMovies from "./components/pages/AddMovies";
import PageNotFound from "./components/pages/PageNotFound";
import TheaterRequests from "./components/pages/TheaterRequests";
import TheaterDetails from "./components/pages/TheaterDetails";
import Movies from "./components/pages/Movies";
import EditMovie from "./components/pages/EditMovie";
import Theaters from "./components/pages/Theaters";

const Router = () => {
  return (
    <Routes>
      {/* Home route or dashboard route */}
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        }
      />

      {/* Add Movies route */}
      <Route
        path="/admin/add-movies"
        element={
          <ProtectRoute>
            <AddMovies />
          </ProtectRoute>
        }
      />

      {/* Theater Requests route */}
      <Route
        path="/admin/theater-requests"
        element={
          <ProtectRoute>
            <TheaterRequests />
          </ProtectRoute>
        }
      />

      {/* Theater details route */}
      <Route
        path="/admin/theater-requests/:theaterId"
        element={
          <ProtectRoute>
            <TheaterDetails />
          </ProtectRoute>
        }
      />

      {/* Theater details route */}
      <Route
        path="/admin/theaters/:theaterId"
        element={
          <ProtectRoute>
            <TheaterDetails />
          </ProtectRoute>
        }
      />

      {/* Movies route */}
      <Route
        path="/admin/movies"
        element={
          <ProtectRoute>
            <Movies />
          </ProtectRoute>
        }
      />

      {/* Edit movie route */}
      <Route
        path="/admin/movies/edit/:movieId"
        element={
          <ProtectRoute>
            <EditMovie />
          </ProtectRoute>
        }
      />

      {/* Theaters route */}
      <Route
        path="/admin/theaters"
        element={
          <ProtectRoute>
            <Theaters />
          </ProtectRoute>
        }
      />

      {/* Not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
