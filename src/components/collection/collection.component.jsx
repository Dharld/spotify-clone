/* eslint-disable react/prop-types */
import "./collection.styles.scss";

const Item = ({ src, name, desc }) => {
  return (
    <div className="collection-item">
      <img src={src} alt="" />
      <div className="collection-item-informations">
        <a className="collection-item-name">{name}</a>
        <div className="collection-item-description">{desc}</div>
      </div>
    </div>
  );
};

const Collection = ({ title, playlists }) => {
  return (
    <div className="collection">
      <div className="collection-header">
        <h3 className="collection-title">{title}</h3>
        <div className="show-all">Show all</div>
      </div>
      <div className="collection-items">
        {playlists.map((item) => (
          <Item
            key={item.name}
            src={item.images[0].url}
            name={item.name}
            desc={item.desc}
            tracks={item.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
