import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProductAdminPage from "./pages/ProductAdminPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/produtos" element={<ProductAdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
