import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home/home.component.jsx";
import Signup from "./features/signup/signup.component.jsx";
import Login from "./features/login/login.component.jsx";
import withAuthGuard from "./components/check-login/with-auth.guard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: withAuthGuard(Home),
  },
  {
    path: "/signup",
    Component: withAuthGuard(Signup),
  },
  {
    path: "/login",
    Component: withAuthGuard(Login),
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
