import { Route, Routes } from "react-router"
import Dashboard from "./components/pages/Dashboard"

const Router = () => {

    return (
        <Routes>
            {/* Dashboard route  */}
            <Route path="/" element={
                <Dashboard />
            } />
        </Routes>
    )

}

export default Router