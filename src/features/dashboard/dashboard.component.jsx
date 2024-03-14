import "./dashboard.styles.scss";
import IconContainer from "../../components/icon-container/icon-container.component";
import Tag from "../../components/tag/tag.component";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="buttons">
          <IconContainer name="prev" />
          <IconContainer name="next" />
        </div>
        <div className="user">
          <IconContainer name="bell" />
        </div>
      </div>
      <div className="tags">
        <Tag label="All" />
        <Tag label="Music" />
        <Tag label="Podcasts" />
        <Tag label="Audiobooks" />
      </div>
    </div>
  );
};

export default Dashboard;
