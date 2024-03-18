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
const Collection = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection">
      <div className="collection-header">
        <h3 className="collection-title">{title}</h3>
        <div className="show-all">Show all</div>
      </div>
      <div className="collection-items">
        {items.map((item, i) => (
          <Item key={i} src={item.src} name={item.name} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
