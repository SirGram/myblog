import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogEntry from "./pages/BlogEntry/BlogEntry";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Auth/Login";
import { ReactNode } from "react";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/blogs/:id" element={<BlogEntry />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
