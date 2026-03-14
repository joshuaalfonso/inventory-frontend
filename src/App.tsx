import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Dashboard from "./features/dashboard/Dashboard"
import Item from "./features/item/Item"
import Auth from "./features/auth/Auth"
import Supplier from "./features/supplier/Supplier"
import Employee from "./features/employee/Employee"
import Category from "./features/Category/Category"
import Brand from "./features/Brand/Brand"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index  element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/item" element={<Item />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/category" element={<Category />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/supplier" element={<Supplier />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
