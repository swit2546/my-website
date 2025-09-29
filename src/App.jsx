import User from "./components/User"
import Meditate from "./components/Meditate"
import Sidebar from "./components/sidebar"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

export default function App() {

  return (
   <div className="min-h-screen w-screen flex flex-col">
      {/* ชื่อ Application */}
      <header className="bg-blue-600 text-white p-4" >
        <h1>แอปแห่งการผ่อนคลายจิตใจทางธรรม</h1>
        </header>
      <div className="flex flex-1">
         <Sidebar />
        {/* หน้าจอหลัก */}
        <main className="flex-1 p-6 bg-white text-slate-950">
    
     
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/meditate" element={<Meditate />} />
                <Route path="/user" element={<User />} />
          </Routes>
        </main>
      </div>
      <footer className="bg-gray-700 text-white p-4 text-center">2025 Copyright</footer>
    </div>
  )
}