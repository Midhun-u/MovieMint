import { Route, Routes } from "react-router"
import Dashboard from "./components/pages/Dashboard"
import ProtectRoute from "./components/features/ProtectRoute"
import PageNotFound from "./components/pages/PageNotFound"

const Router = () => {

    return (
        <Routes>
            {/* Dashboard route  */}
            <Route path="/" element={
                <ProtectRoute>
                    <Dashboard />
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