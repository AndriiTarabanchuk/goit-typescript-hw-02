import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

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

interface Gallery {
  items: Item[];
  setItemClickGallery: (item: {
    id: string;
    alt_description: string;
    img: string;
    urls: {
      small: string;
      regular: string;
    };
    updated_at: string;
    likes: number;
  }) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ImageGallery: React.FC<Gallery> = ({
  items,
  setItemClickGallery,
  setIsModalOpen,
}) => {
  return (
    <ul className={css.ul}>
      {items.map((item) => (
        <li className={css.li} key={item.id}>
          <ImageCard
            item={item}
            setItemClickGallery={setItemClickGallery}
            setIsModalOpen={setIsModalOpen}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
