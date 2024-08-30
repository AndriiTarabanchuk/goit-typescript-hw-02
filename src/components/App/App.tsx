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
  interface breadcrumb {
    index: number;
    slug: string;
    title: string;
    type: string;
  }

  interface Tag {
    title: string;
    type: string;
    source: {
      affiliate_search_query: null;
      ancestry: {
        category: { pretty_slug: string; slug: string };
        subcategory: { pretty_slug: string; slug: string };
        type: { pretty_slug: string; slug: string };
      };
      cover_photo: {
        alt_description: string;
        alternative_slugs?: {
          de: string;
          en: string;
          es: string;
          fr: string;
          it: string;
          ja: string;
          ko: string;
          pt: string;
        };
        asset_type?: string;
        blur_hash?: string;
        breadcrumbs?: breadcrumb[];
        color?: string;
        created_at?: string;
        current_user_collections?: [];
        description?: string | null;
        height?: number;
        liked_by_user?: boolean;
        links?: {
          download: string;
          download_location: string;
          html: string;
          self: string;
        };
        plus: string;
        premium: boolean;
        promoted_at?: null;
        slug?: string;
        sponsorship?: null;
        topic_submissions?: {};
        updated_at: string;
        urls: {
          full?: string;
          raw?: string;
          regular?: string;
          small: string;
          small_s3?: string;
          thumb?: string;
        };
        user?: {
          accepted_tos?: boolean;
          bio?: number | string;
          first_name?: string;
          for_hire?: boolean;
          id?: string;
          instagram_username?: string;
          last_name?: string;
          links?: {
            followers: string;
            following: string;
            html: string;
            likes: string;
            photos: string;
            portfolio: string;
            self: string;
          };
          location: string;
          name: string;
          portfolio_url: string;
          profile_image: {
            large: string;
            medium: string;
            small: string;
          };
          social: {
            instagram_username: string | null;
            paypal_email: string | null;
            portfolio_url: string;
            twitter_username: string;
          };
          total_collections: number;
          total_illustrations: number;
          total_likes: number;
          total_photos: number;
          total_promoted_illustrations: number;
          total_promoted_photos: number;
          twitter_username: string;
          updated_at: string;
          username: string;
        };
        width: number;
        likes: number;
      };
      description: string;
      meta_description: string;
      meta_title: string;
      subtitle: string;
      title: string;
    };
  }
  interface Item {
    alternative_slugs?: {
      de: string;
      en: string;
      es: string;
      fr: string;
      it: string;
      ja: string;
      ko: string;
      pt: string;
    };
    asset_type?: string;
    blur_hash?: string;
    breadcrumbs?: [];
    color?: string;
    created_at?: string;
    current_user_collections?: [];
    description?: string | null;
    height?: number;
    liked_by_user?: boolean;
    links?: {
      download: string;
      download_location: string;
      html: string;
      self: string;
    };
    promoted_at?: null;
    slug?: string;
    sponsorship?: null;
    tags?: Tag[];
    topic_submissions?: {};
    user?: {
      accepted_tos?: boolean;
      bio?: number;
      first_name?: string;
      for_hire?: boolean;
      id?: string;
      instagram_username?: string;
      last_name?: string;
      links?: {
        followers: string;
        following: string;
        html: string;
        likes: string;
        photos: string;
        portfolio: string;
        self: string;
      };
      location: string;
      name: string;
      portfolio_url: string;
      profile_image: {
        large: string;
        medium: string;
        small: string;
      };
      social: {
        instagram_username: string | null;
        paypal_email: string | null;
        portfolio_url: string;
        twitter_username: string;
      };
      total_collections: number;
      total_illustrations: number;
      total_likes: number;
      total_photos: number;
      total_promoted_illustrations: number;
      total_promoted_photos: number;
      twitter_username: string;
      updated_at: string;
      username: string;
    };
    width?: number;
    alt_description: string;
    id: string;
    updated_at: string;
    img: string;
    urls: {
      full?: string;
      raw?: string;
      regular: string;
      small: string;
      small_s3?: string;
      thumb?: string;
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
  const [itemClickGallery, setItemClickGallery] = useState<Item>({
    id: "",
    alt_description: "",
    updated_at: "",
    img: "",
    urls: {
      regular: "",
      small: "",
    },
    likes: 0,
  } as Item);
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
    if (photos.length < 1) {
      setIsError(true);
      setMessageError(message.errorFetch);
      setIsShowLoader(false);
    }
  }, [photos, page]);
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (query === "") return;
      try {
        setIsError(false);
        setIsShowLoader(true);
        const response: Response = await fetchData({ url, query, page });
        console.log(response);
        if (isMounted) {
          if (page === 1) {
            setPhotos(response.results);
          } else {
            setPhotos((pref) => [...pref, ...response.results]);
          }
          setTotalPages(response.total_pages);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setIsError(true);
          setMessageError(message.errorFetch);
        }
      } finally {
        if (isMounted) {
          setIsShowLoader(false);
        }
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
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
