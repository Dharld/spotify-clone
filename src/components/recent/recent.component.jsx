/* eslint-disable react/prop-types */
import { usePlayer } from "../player/player.context";
import "./recent.styles.scss";

const Recent = ({ track }) => {
  const { setCurrentTrack } = usePlayer();

  return (
    <div className="recent">
      <div className="img">
        <img src={track.imgUrl} alt="" />
      </div>
      <div className="text">{track.label}</div>
      <div className="play-button" onClick={() => setCurrentTrack(track)}>
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Recent;
