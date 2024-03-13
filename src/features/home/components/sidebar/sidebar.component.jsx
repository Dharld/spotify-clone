import "./sidebar.styles.scss";

import { Link } from "react-router-dom";
import IconSVG from "../../../../components/icon-svg/icon-svg.component";
import { useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [links, setLinks] = useState([
    {
      label: "home",
      to: "",
      active: true,
    },
    {
      label: "search",
      to: "search",
      active: false,
    },
  ]);

  const [playlistIcon, setPlaylistIcon] = useState({
    label: "playlist",
    active: false,
  });

  const [collections, setCollections] = useState([
    {
      label: "Liked Songs",
      imageUrl: "	https://misc.scdn.co/liked-songs/liked-songs-64.png",
      category: "Playlist",
    },
    {
      label: "My hits",
      imageUrl:
        "https://i.scdn.co/image/ab67616d000011ebe85259a1cae29a8d91f2093d",
      category: "Playlist",
    },
  ]);

  /** Functions  */
  const handleNavigation = (label) => {
    const newLinks = links.map((l) => {
      if (l.label === label) return { ...l, active: true };
      return { ...l, active: false };
    });
    setLinks(newLinks);
  };

  const handlePlaylistIcon = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`wrapper ${expanded ? "expanded" : ""}`}>
      <nav className="nav sidebar">
        <ul className="nav-ul">
          {links.map(({ to, label, active }) => {
            return (
              <li
                className="nav-li"
                key={label}
                onClick={() => handleNavigation(label)}
              >
                <Link to={to}>
                  <IconSVG styles="fill-white" name={label} active={active} />
                  {expanded && (
                    <span>{label[0].toUpperCase() + label.slice(1)}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="nav flex-1">
        <ul className="nav-ul">
          <li className="nav-li">
            <div className="icon-wrap">
              <IconSVG
                styles="fill-white"
                name={playlistIcon.label}
                active={playlistIcon.active}
                handleClick={handlePlaylistIcon}
              />
            </div>
          </li>
          <div className="playlists">
            {collections.map(({ label, imageUrl }) => {
              return (
                <Link to="playlist" className="nav-li" key={label}>
                  <div className="icon-wrap">
                    <img src={imageUrl} alt="" />
                  </div>
                </Link>
              );
            })}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
