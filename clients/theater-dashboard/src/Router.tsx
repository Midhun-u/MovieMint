import { Route, Routes } from "react-router"
import Dashboard from "./components/pages/Dashboard"
import ProtectRoute from "./components/features/ProtectRoute"
import PageNotFound from "./components/pages/PageNotFound"
import CheckTheaterAvailability from "./components/features/CheckTheaterAvailability"

const Router = () => {

    return (
        <Routes>
            {/* Dashboard route  */}
            <Route path="/" element={
                <ProtectRoute>
                    <CheckTheaterAvailability>
                        <Dashboard />
                    </CheckTheaterAvailability>
                </ProtectRoute>
            } />

            {/* Page not found */}
            <Route path="*" element={
                <PageNotFound
                />
            } />
        </Routes>
    )

}

export default Router