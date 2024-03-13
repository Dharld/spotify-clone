import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home/home.component.jsx";
import Signup from "./features/signup/signup.component.jsx";
import Login from "./features/login/login.component.jsx";
import withAuthGuard from "./components/check-login/with-auth.guard.jsx";
import Dashboard from "./features/dashboard/dashboard.component.jsx";
import Search from "./features/search/search.component.jsx";
import Playlist from "./features/playlist/playlist.component.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // Component: withAuthGuard(Home),
    Component: withAuthGuard(Home),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "playlist",
        element: <Playlist />,
      },
    ],
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
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
