import "./sidebar.styles.scss";

import { Link } from "react-router-dom";
import IconSVG from "../../../../components/icon-svg/icon-svg.component";
import { useState } from "react";
import Tag from "../../../../components/tag/tag.component";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

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
      items: [1, 2, 3],
      owner: "Dharld",
    },
    {
      label: "My hits",
      imageUrl:
        "https://i.scdn.co/image/ab67616d000011ebe85259a1cae29a8d91f2093d",
      category: "Playlist",
      items: [1, 2, 3],
      owner: "Dharld",
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
    <div className={`wrapper ${expanded ? "expanded" : ""} sidebar`}>
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
        <li className="nav-li">
          <div className="icon-wrap playlist-icon" onClick={handlePlaylistIcon}>
            <IconSVG
              styles="fill-white"
              name={playlistIcon.label}
              active={playlistIcon.active}
            />
            {expanded && <span>Your Library</span>}
          </div>
          {expanded && (
            <div className="buttons">
              <div className="button-container">
                <IconSVG
                  styles="fill-white"
                  name="add"
                  active={true}
                  size="small"
                />
              </div>
              <div className="button-container">
                <IconSVG
                  styles="fill-white"
                  name="arrowNext"
                  active={true}
                  size="small"
                />
              </div>
            </div>
          )}
        </li>
        {expanded && (
          <>
            <div className="tags">
              <Tag label="Playlists" />
            </div>
            <div className="wrap parameters">
              <IconSVG name="search" size="small" />
              <div className="recents">
                <span>Recents</span>
                <IconSVG name="tracks" active={true} />
              </div>
            </div>
          </>
        )}
        <ul className="nav-ul">
          <div className={`playlists ${expanded ? "expanded" : ""}`}>
            {collections.map(({ label, imageUrl, category, items }) => {
              return (
                <li className="nav-li" key={label}>
                  <div className="icon">
                    <Link to="playlist" className="nav-link">
                      <div className="icon-wrap">
                        <img src={imageUrl} alt="" />
                      </div>
                      {
                        <div className="informations">
                          <div className="title">{label}</div>
                          <div className="details">
                            <span>{category}</span>
                            <div className="dot"></div>
                            <span>{items.length}</span>
                          </div>
                        </div>
                      }
                    </Link>
                  </div>
                </li>
              );
            })}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
