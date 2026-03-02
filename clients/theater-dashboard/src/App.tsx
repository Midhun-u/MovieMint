import style from "./App.module.scss";
import ToastMessage from "./components/context/components/ToastMessage";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Router from "./Router";

const App = () => {
  return (
    <>
      <Header />
      <section className={style.container}>
        <Sidebar />
        <div className={style.pages}>
          <ToastMessage>
            <Router />
          </ToastMessage>
        </div>
      </section>
    </>
  );
};

export default App;
