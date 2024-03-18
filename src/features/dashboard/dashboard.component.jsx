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
      <div className="recents">
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
        <div className="recent">
          <div className="img">
            <img
              src="https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3"
              alt=""
            />
          </div>
          <div className="text">Confidence Boost</div>
          <div className="play-button"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
