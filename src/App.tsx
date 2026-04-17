import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Dashboard from "./features/dashboard/Dashboard"
import Item from "./features/item/Item"
import Auth from "./features/auth/Auth"
import Supplier from "./features/supplier/Supplier"
import Employee from "./features/employee/Employee"
import ItemType from "./features/item-type/ItemType"
import UnitOfMeasure from "./features/unit-of-measure/UnitOfMeasure"
import { Toaster } from "@/components/ui/toaster";
import SileoToaster from "./shared/components/SileoToaster"
import Department from "./features/department/Department"
import PurchaseOrder from "./features/purchase-order/PurchaseOrder"
import PurchaseOrderDetail from "./features/purchase-order/pages/PurchaseOrderDetail/PurchaseOrderDetail"
import PurchaseOrderForm from "./features/purchase-order/pages/PurchaseOrderForm/PurchaseOrderForm"
import Incoming from "./features/incoming/Incoming"
import IncomingForm from "./features/incoming/pages/Incoming-form/IncomingForm"
import IncomingDetail from "./features/incoming/pages/incoming-detail/IncomingDetail"
import Brand from "./features/Brand/Brand"
import Category from "./features/Category/Category"


function App() {

  return (
    <>
      <Toaster />
      <SileoToaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index  element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/item" element={<Item />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/category" element={<Category />} />
            <Route path="/item-type" element={<ItemType />} />
            <Route path="/unit-of-measure" element={<UnitOfMeasure />} />
            <Route path="/department" element={<Department />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/purchase-order" element={<PurchaseOrder />} />
            <Route path="/purchase-order/:purchase_order_id" element={<PurchaseOrderDetail />} />
            <Route path="/purchase-order/new" element={<PurchaseOrderForm />} />
            <Route path="/purchase-order/:purchase_order_id/edit" element={<PurchaseOrderForm />} />
            <Route path="/incoming" element={<Incoming />} />
            <Route path="/incoming/:incoming_id" element={<IncomingDetail />} />
             <Route path="/incoming/new" element={<IncomingForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
