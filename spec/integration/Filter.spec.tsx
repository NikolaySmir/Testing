import { render, screen } from "@testing-library/react";
import { act } from "react";
import { Provider } from "react-redux";
import { TaskList } from "src/modules/TaskList";
import { createTestStore } from "src/store/configureStore";
import { addTask, setHideCompleted } from "src/store/taskSlice";

const initialState = {
  taskList: {
    list: [
      { id: 1, header: "Задача 1", done: false },
      { id: 2, header: "Задача 2", done: true },
      { id: 3, header: "Задача 3", done: false },
    ],
    notification: "",
    hideCompleted: false,
  },
};

describe("Список задач", () => {
  let store: ReturnType<typeof createTestStore>;

  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", () => {
    store = createTestStore({
      taskList: { ...initialState.taskList, hideCompleted: true },
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument();
    expect(screen.getByText("Задача 3")).toBeInTheDocument();
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", () => {
    store = createTestStore({
      taskList: { ...initialState.taskList, hideCompleted: false },
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
    expect(screen.getByText("Задача 3")).toBeInTheDocument();
  });

  it("при включении фильтра скрываются выполненные задачи, при выключении - снова отображаются", async () => {
    store = createTestStore({
      taskList: { ...initialState.taskList, hideCompleted: false },
    });

    const { rerender } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
    expect(screen.getByText("Задача 3")).toBeInTheDocument();

    await act(async () => {
      store.dispatch(setHideCompleted(true));
      await Promise.resolve();
    });

    rerender(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument();
    expect(screen.getByText("Задача 3")).toBeInTheDocument();

    await act(async () => {
      store.dispatch(setHideCompleted(false));
      await Promise.resolve();
    });

    rerender(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    );

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
    expect(screen.getByText("Задача 3")).toBeInTheDocument();
  });
});
