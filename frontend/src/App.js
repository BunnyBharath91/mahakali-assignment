import { Route, Routes } from "react-router-dom";

import Test from "./pages/Test/Test";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/adminDashboard/Dashboard";





function App() {

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} >
        <Route path="" element={<Test />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
