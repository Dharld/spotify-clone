import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>Sidebar</nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
