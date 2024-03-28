import { useEffect, useState } from "react";
import { usePlayer } from "./player.context";
import "./player.styles.scss";
import { useToast } from "../../context/toaster.context";

const Player = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondsElapsed, setElapsedSeconds] = useState(0);
  const [minutesElapsed, setElapsedMinutes] = useState(0);
  const [percentageOfCompletion, setPercentageOfCompletion] = useState(0);

  const { getCurrentTrack, getAudioResource, getElapsedTime, pause, play } =
    usePlayer();
  const currentTrack = getCurrentTrack();
  const audio = getAudioResource();
  const elapsedTime = getElapsedTime();
  const { successToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === " ") {
        successToast("Space bar pressed");
        if (audio.paused) {
          play();
        } else {
          pause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Don't forget to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audio, play, pause]);

  useEffect(() => {
    const getMinutes = () => {
      const minutes = Math.floor(elapsedTime / 60);
      return minutes;
    };
    const getSeconds = () => {
      const seconds = Math.floor(elapsedTime % 60);
      return seconds;
    };
    setElapsedSeconds(getSeconds());
    setElapsedMinutes(getMinutes());
    setPercentageOfCompletion((elapsedTime / Math.floor(audio.duration)) * 100);
  }, [elapsedTime]);

  useEffect(() => {
    const getMinutes = () => {
      if (audio && audio.duration) {
        const minutes = Math.floor(audio.duration / 60);
        return minutes;
      }
      return 0;
    };
    const getSeconds = () => {
      if (audio && audio.duration) {
        const seconds = Math.floor(audio.duration % 60);
        return seconds;
      }
      return 0;
    };

    setSeconds(getSeconds());
    setMinutes(getMinutes());
  }, [audio.duration]);

  return (
    <div className="player">
      <div className="track">
        {currentTrack ? (
          <div className="wrapper">
            <img src={currentTrack.imgUrl} alt="" className="track-img" />
            <div className="track-info">
              <div className="title">{currentTrack.label}</div>
              <div className="artist">
                {currentTrack.artists.map((a) => a.name).join(",")}
              </div>
            </div>
          </div>
        ) : (
          <div className="pholder"></div>
        )}
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
          <button
            className="control play"
            onClick={() => {
              console.log(audio.played);
              if (!audio.paused) {
                pause();
              } else {
                play();
              }
            }}
          >
            {audio.paused ? (
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            ) : (
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <rect x="4" y="2" width="3" height="12"></rect>
                <rect x="9" y="2" width="3" height="12"></rect>
              </svg>
            )}
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
          <div className="progress-text progress-current">
            {`${minutesElapsed}`.padStart(2, "0")}:
            {`${secondsElapsed}`.padStart(2, "0")}
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-indicator"
              style={{ width: `${percentageOfCompletion}%` }}
            ></div>
          </div>
          <div className="progress-text progress-current" style={{}}>
            {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="widgets"></div>
    </div>
  );
};

export default Player;
