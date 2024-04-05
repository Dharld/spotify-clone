import "./dashboard.styles.scss";
import IconContainer from "../../components/icon-container/icon-container.component";
import Tag from "../../components/tag/tag.component";
import { useEffect, useRef, useState } from "react";
import Recent from "../../components/recent/recent.component.jsx";
import Collection from "../../components/collection/collection.component.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedPlaylists,
  fetchRecentlyPlayedTracks,
} from "../../redux/slices/tracks/tracks.actions.js";
import { useToast } from "../../context/toaster.context.jsx";
import SkeletonDashboard from "../../components/skeleton-dashboard/skeleton-dashboard.component.jsx";

// const RECENT_ITEM = {
//   src: "https://i.scdn.co/image/ab67706f00000002442131f5be7366c4c3ededb3",
//   label: "Confidence Boost",
// };

// const COLLECTION_ITEM = {
//   title: "Hot new release",
//   items: [
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Pop Hits",
//       desc: "Today's top pop hits. Cover: Dua Lipa",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Rock Classics",
//       desc: "Classic rock anthems. Cover: Queen",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Hip Hop Essentials",
//       desc: "Essential hip hop tracks. Cover: Kendrick Lamar",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Indie Vibes",
//       desc: "Indie music for the soul. Cover: Tame Impala",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Throwback Jams",
//       desc: "Nostalgic throwback hits. Cover: Michael Jackson",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "EDM Party",
//       desc: "Electronic dance music party. Cover: Martin Garrix",
//     },
//     {
//       src: "https://i.scdn.co/image/ab67706f000000029b2c4d9ca18d081e722c5490",
//       name: "Chill Out",
//       desc: "Relaxing chill out tunes. Cover: Norah Jones",
//     },
//   ],
// };

const Dashboard = () => {
  const { errorToast } = useToast();
  const error = useSelector((state) => state.track.error);
  const featured = useSelector((state) => state.track.featuredPlaylists);
  const recents = useSelector((state) => state.track.recentlyPlayedTracks);
  const loadingRecents = useSelector((state) => state.track.loading);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const dashboardRef = useRef();

  useEffect(() => {
    if (error) {
      errorToast(error.message);
    }
  }, [error, errorToast]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = dashboardRef.current.scrollTop;
      setScrollPosition(currentPosition);
    };

    dashboardRef.current &&
      dashboardRef.current.addEventListener("scroll", handleScroll);

    return () => {
      dashboardRef.current &&
        dashboardRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const spotifyToken = localStorage.getItem("spotifyToken");
    if (spotifyToken) {
      dispatch(fetchRecentlyPlayedTracks(spotifyToken));
      dispatch(fetchFeaturedPlaylists(spotifyToken));
    }
  }, []);

  return (
    <>
      <div
        className={`dashboard ${scrollPosition > 50 ? "scrolled" : ""}`}
        ref={dashboardRef}
      >
        <div className="header-wrapper">
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
        {loadingRecents ? (
          <div className="dashboard-body">
            <SkeletonDashboard />
          </div>
        ) : (
          <div className="dashboard-body">
            <div className="recents-wrapper">
              <h3>Recently Played</h3>
              <div className="recents">
                {recents.map((t, i) => (
                  <Recent track={t} key={i} />
                ))}
              </div>
            </div>

            <div className="collections">
              {featured.length > 0 && (
                <Collection title="Popular Songs" playlists={featured} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
