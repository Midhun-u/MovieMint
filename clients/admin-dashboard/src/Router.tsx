import { Route, Routes } from "react-router"
import ProtectRoute from "./components/features/ProtectRoute"
import Dashboard from "./pages/Dashboard"

const Router = () => {

    return (
        <Routes>
            {/* Home route or dashboard route */}
            <Route path="/" element={
                <ProtectRoute>
                    <Dashboard />
                </ProtectRoute>
            }
            />

            {/* Not found */}
            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    )

}

export default Router