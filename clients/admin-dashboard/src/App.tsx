import { Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import ProtectRoute from "./components/features/ProtectRoute"
import Header from "./components/layout/Header"

const App = () => {

  return (

    <>
      <Header />
      <Routes>
        {/* Home route or dashboard route */}
        <Route path="/:authToken" element={
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        }
        />

        {/* Not found */}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>

  )

}

export default App