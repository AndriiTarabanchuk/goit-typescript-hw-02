import css from "./MainContainer.module.css";
interface PropsMainContainer {
  children?: React.ReactNode;
}

const MainContainer: React.FC<PropsMainContainer> = ({ children }) => {
  return <main className={css.main}>{children}</main>;
};

export default MainContainer;
