import css from "./ImageCard.module.css";

interface Item {
  item: {
    id: string;
    img: string;
    alt_description: string;
    urls: {
      small: string;
    };
    updated_at: string;
    likes: number;
  };
  setItemClickGallery: (item: Item["item"]) => void; // Додано тип для функції
  setIsModalOpen: (isOpen: boolean) => void; // Додано тип для функції
}

const ImageCard: React.FC<Item> = ({
  item,
  setItemClickGallery,
  setIsModalOpen,
}) => {
  const handleClick = (item: Item["item"]) => {
    setItemClickGallery(item);
    setIsModalOpen(true);
  };
  return (
    <div className={css.wrap}>
      <img
        className={css.img}
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => handleClick(item)}
      />
      <div className={css.soc}>
        <p className={css.info}>{item.alt_description}</p>
        {/* <p className={css.info}>
          date:
          {item.updated_at.slice(0, 10)}
        </p>
        <p className={css.info}>likes:{item.likes}</p> */}
      </div>
    </div>
  );
};
export default ImageCard;
