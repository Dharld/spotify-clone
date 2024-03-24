import { useDispatch } from "react-redux";
import Button from "../../components/button/button.component";
import "./authorize-spotify.styles.scss";
import { authorizeSpotify } from "../../redux/slices/auth/auth.actions";

const AuthorizeSpotify = () => {
  const dispatch = useDispatch();

  const authorize = () => {
    dispatch(authorizeSpotify());
  };

  return (
    <div className="authorize-spotify">
      <div className="container">
        <div className="container-title">
          <h1>Authorize Spotify</h1>
        </div>
        <div className="container-description">
          <p>
            To use this app, you need to authorize Spotify to access your
            account. This authorization is required in order to provide you with
            personalized recommendations and access to your Spotify library.
          </p>
        </div>
        <div className="button-wrapper">
          <Button
            label="Go to the Authorization page"
            type="button"
            onClick={authorize}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorizeSpotify;
