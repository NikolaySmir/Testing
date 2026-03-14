import { store } from "./store/configureStore";

import "./styles.css";
import { NewTaskBar } from "./modules/NewTaskBar";
import { TaskList } from "./modules/TaskList";
import { Provider } from "react-redux";
import { NotifierContainer } from "./modules/NotifierContainer";
import { Store } from "@reduxjs/toolkit";

interface AppProps {
  store?: Store;
}

export const App = ({ store: propStore }: AppProps) => {
  const storeToUse = propStore || store;
  return (
    <div className="root-container">
      <Provider store={storeToUse}>
        <h3>Список задач</h3>
        <NewTaskBar />
        <TaskList />
        <NotifierContainer />
      </Provider>
    </div>
  );
};
