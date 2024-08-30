import css from "./SearchBar.module.css";
import { FaSistrix } from "react-icons/fa";
import { message } from "../services/const.js";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

interface PropsSearchBar {
  setQuery: (query: string) => void;
  messageError: string;
  isError: boolean;
  setIsError: (isError: boolean) => void;
}

const SearchBar: React.FC<PropsSearchBar> = ({
  setQuery,
  messageError,
  isError,
  setIsError,
}) => {
  const [input, setInput] = useState<string>("");
  const searchInput = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) {
      setIsError(true);
      toast.error(message.errorField, {
        duration: 1800,
        position: "top-left",
      });
      return;
    }
    setQuery(searchInput.current?.value.trim() || "");
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.query}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Search images and photos"
          ref={searchInput}
        />
        <button className={css.btn} type="submit">
          <FaSistrix />
        </button>
      </form>
      {messageError === message.errorField && isError ? <Toaster /> : <p></p>}
    </header>
  );
};

export default SearchBar;
