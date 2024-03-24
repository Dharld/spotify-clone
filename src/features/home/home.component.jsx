import { Outlet } from "react-router-dom";
import "./home.styles.scss";
import Sidebar from "./components/sidebar/sidebar.component.jsx";
import Player from "../../components/player/player.component.jsx";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Sidebar />
      <main className="main-section">
        <Outlet></Outlet>
      </main>
      <Player />
    </div>
  );
};

export default Home;
