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
      <div className="player">
        <div className="track">
          <img
            src="https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490"
            alt=""
            className="track-img"
          />
          <div className="track-info">
            <div className="title">Problèmes d'adultes</div>
            <div className="artist">Sexion d'assaut</div>
          </div>
        </div>
        <div className="controls">
          <div className="buttons">
            <button className="control prev">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
              </svg>
            </button>
            <button className="control play">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            </button>
            <button className="control next">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
              </svg>
            </button>
          </div>
          <div className="progress">
            <div className="progress-text progress-current">1:25</div>
            <div className="progress-bar"></div>
            <div className="progress-text progress-current">4:00</div>
          </div>
        </div>
        <div className="widgets"></div>
      </div>
    </div>
  );
};

export default Home;
