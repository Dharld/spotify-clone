import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home/home.component.jsx";
import Signup from "./features/signup/signup.component.jsx";
import Login from "./features/login/login.component.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App bg-primary">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
