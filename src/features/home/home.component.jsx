import { Outlet } from "react-router-dom";
import "./home.styles.scss";
import Sidebar from "./components/sidebar/sidebar.component";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Sidebar />
      <main className="main-section">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Home;
