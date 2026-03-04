import { Route, Routes } from "react-router";
import Dashboard from "./components/pages/Dashboard";
import ProtectRoute from "./components/features/ProtectRoute";
import PageNotFound from "./components/pages/PageNotFound";
import CheckTheaterAvailability from "./components/features/CheckTheaterAvailability";
import AddShows from "./components/pages/AddShows";
import AddShowDetails from "./components/pages/AddShowDetails";
import CurrentShows from "./components/pages/CurrentShows";
import EditShow from "./components/pages/EditShow";

const Router = () => {
  return (
    <Routes>
      {/* Dashboard route  */}
      <Route
        path="/"
        element={
          <ProtectRoute>
            <CheckTheaterAvailability>
              <Dashboard />
            </CheckTheaterAvailability>
          </ProtectRoute>
        }
      />

      {/* Add show route */}
      <Route
        path="/theater/add-shows"
        element={
          <ProtectRoute>
            <CheckTheaterAvailability>
              <AddShows />
            </CheckTheaterAvailability>
          </ProtectRoute>
        }
      />
      
      {/* Add show route */}
      <Route
        path="/theater/add-shows/:movieId"
        element={
          <ProtectRoute>
            <CheckTheaterAvailability>
              <AddShowDetails
              />
            </CheckTheaterAvailability>
          </ProtectRoute>
        }
      />

      {/* Current show route */}
      <Route
        path="/theater/current-shows"
        element={
          <ProtectRoute>
            <CheckTheaterAvailability>
              <CurrentShows
              />
            </CheckTheaterAvailability>
          </ProtectRoute>
        }
      />

      {/* Edit show route */}
      <Route
        path="/theater/current-shows/edit/:showId/:movieId"
        element={
          <ProtectRoute>
            <CheckTheaterAvailability>
              <EditShow
              />
            </CheckTheaterAvailability>
          </ProtectRoute>
        }
      />

      {/* Page not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
