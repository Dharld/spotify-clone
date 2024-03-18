import "./dashboard.styles.scss";
import IconContainer from "../../components/icon-container/icon-container.component";
import Tag from "../../components/tag/tag.component";
import { useState } from "react";
import Recent from "../../components/recent/recent.component.jsx";
import Collection from "../../components/collection/collection.component.jsx";

const RECENT_ITEM = {
  src: "https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3",
  label: "Confidence Boost",
};

const ITEM = {
  src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
  name: "Hot Country",
  desc: "Today's top country hits. Cover: Kacey Musgraves",
};

const COLLECTION_ITEM = {
  title: "Hot new release",
  items: new Array(7).fill(ITEM),
};

const Dashboard = () => {
  const [recents, setRecents] = useState(new Array(8).fill(RECENT_ITEM));

  const [collections, setCollections] = useState(
    new Array(4).fill(COLLECTION_ITEM)
  );

  console.log(collections);

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
        {recents.map((r, i) => (
          <Recent label={r.label} src={r.src} key={i} />
        ))}
      </div>
      <div className="collections">
        {collections.map((c, i) => (
          <Collection key={i} collection={c} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
