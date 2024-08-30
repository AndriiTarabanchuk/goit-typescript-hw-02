import { useEffect, useState, useRef } from "react";
import { message } from "../services/const";
import { fetchData } from "../services/fetchData";
import { url } from "../services/url";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import MainContainer from "../MainContainer/MainContainer";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css";

function App() {
  interface Item {
    alt_description: string;
    id: string;
    updated_at: string;
    img: string;
    urls: {
      regular: string;
      small: string;
    };
    likes: number;
  }
  interface Response {
    results: Item[];
    total_pages: number;
    total: number;
  }
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemClickGallery, setItemClickGallery] = useState<Item | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");

  const lastElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page > 1 && lastElement.current) {
      // lastElement.current.scrollIntoView({
      //   behavior: "smooth",
      //   block: "nearest",
      //   inline: "center",
      // });
    }
    if (photos?.length < 1 && query !== "") {
      setIsError(true);
      setMessageError(message.errorFetch);
      setIsShowLoader(false);
    }
  }, [photos, page]);

  useEffect(() => {
    const getData = async () => {
      if (query === "") return;
      try {
        setIsError(false);
        setIsShowLoader(true);
        const response: Response = await fetchData({ url, query, page });
        if (page === 1) {
          setPhotos(response.results);
        } else {
          setPhotos((pref) => [...pref, ...response.results]);
        }
        setTotalPages(response.total_pages);
      } catch (error) {
        console.log(error);

        setIsError(true);
        setMessageError(message.errorFetch);
      } finally {
        setIsShowLoader(false);
      }
    };
    getData();
  }, [query, page, url]);

  function handleSearch(query: string) {
    setPhotos([]);
    setPage(1);
    setQuery(query);
    setIsError(false);
  }

  return (
    <div className={css.root}>
      <SearchBar
        setQuery={handleSearch}
        messageError={messageError}
        isError={isError}
        setIsError={setIsError}
      />
      <MainContainer>
        {isError && <ErrorMessage messageError={messageError} />}
        {!isError && (
          <ImageGallery
            items={photos}
            setItemClickGallery={setItemClickGallery}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {isShowLoader && <Loader />}
        {isModalOpen && itemClickGallery && (
          <ImageModal
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            itemClickGallery={itemClickGallery}
          />
        )}

        {photos.length > 0 &&
          page !== totalPages &&
          !isError &&
          !isShowLoader && <LoadMoreBtn setPage={setPage} />}
        <div ref={lastElement}></div>
      </MainContainer>
    </div>
  );
}

export default App;
