import css from "./ImageCard.module.css";
interface Item {
  id: string;
  alt_description: string;
  img: string;
  urls: {
    small: string;
    regular: string;
  };
  updated_at: string;
  likes: number;
}

interface PropsImageCard {
  item: Item;
  setItemClickGallery: (item: Item) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ImageCard: React.FC<PropsImageCard> = ({
  item,
  setItemClickGallery,
  setIsModalOpen,
}) => {
  const handleClick = (item: Item) => {
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
