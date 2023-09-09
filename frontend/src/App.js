import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Login from "./Login";
import Home from "./Home";
import MyRecords from "./Pages/Patient/myRecords";
import Appointment from "./Pages/Patient/Appointment";
import ManageAccess from "./Pages/Patient/manageAccess";
import ViewRecords from "./Pages/Doctor/viewRecords";
import AddRecords from "./Pages/Doctor/addRecords";
import AddPatient from "./Pages/Doctor/addPatient";
import ManageAppointments from "./Pages/Doctor/manageAppointments";
import ViewPrescription from "./Pages/Pharmacy/viewPrescription";
import RegisterDoctor from "./Reg";
import PatientRegister from "./Pages/Patient/PatientReg";

function App() {
  
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/regDoc">
          <Route index element={<RegisterDoctor />} />
          <Route path="regDoc" element={<RegisterDoctor />} />
        </Route>

        <Route path="/patientreg">
          <Route index element={<PatientRegister />} />
          <Route path="regDoc" element={<PatientRegister />} />
        </Route>

        <Route path="/home" element={<Home />} />

        <Route path="/myrecords" element={<MyRecords />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/manageaccess" element={<ManageAccess />} />

        <Route path="/manageAppointments" element={<ManageAppointments />} />
        <Route path="/viewrecords" element={<ViewRecords />} />
        <Route path="/addrecords" element={<AddRecords />} />
        <Route path="/addpatient" element={<AddPatient />} />

        <Route path="/pharmacy" element={<ViewPrescription />} />
      </Routes>   
    </BrowserRouter>
   );
}

export default App;