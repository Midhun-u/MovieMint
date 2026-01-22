import { Route, Routes } from "react-router"
import ProtectRoute from "./components/features/ProtectRoute"
import Dashboard from "./pages/Dashboard"
import AddMovies from "./pages/AddMovies"
import PageNotFound from "./pages/PageNotFound"

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

            {/* Not found */}
            <Route
                path="*"
                element={
                    <PageNotFound />
                }
            />
        </Routes>
    )

}

export default Router