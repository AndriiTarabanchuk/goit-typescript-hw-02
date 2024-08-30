import React from "react";
// import ReactModal from "react-modal";
import Modal from "react-modal";

import css from "./ImageModal.module.css";
import "./Modal.css";

interface ItemClickGallery {
  id: string;
  img: string;
  alt_description: string | undefined;
  urls: {
    small: string;
    regular: string | undefined;
  };
  updated_at: string;
  likes: number;
}

interface PropsImageModal {
  itemClickGallery: ItemClickGallery;
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ImageModal: React.FC<PropsImageModal> = ({
  isOpen,
  setIsModalOpen,
  itemClickGallery,
}) => {
  const handleClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={handleClick}
        closeTimeoutMS={300}
        // overlayClassName="Overlay"
        // className="Modal"
      >
        <button type="button" className="closeBtn" onClick={handleClick}>
          x
        </button>
        <div className={css.wrap}>
          <img
            className={css.img}
            src={itemClickGallery.urls.regular}
            alt={itemClickGallery.alt_description}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
