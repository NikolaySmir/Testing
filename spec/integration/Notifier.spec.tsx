import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { App } from "src/App";
import { createTestStore } from "src/store/configureStore";
import { addTask } from "src/store/taskSlice";

describe("Оповещение при вополнении задачи", () => {
  it("появляется и содержит заголовок задачи", async () => {
    const store = createTestStore();

    store.dispatch(addTask(`Задача 1`));
    store.dispatch(addTask(`Задача 2`));
    store.dispatch(addTask(`Задача 3`));

    render(<App store={store} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[2]);
    expect(checkboxes[2]).toBeChecked();

    const state = store.getState();
    expect(state.taskList.notification).toContain("Задача 2");
    expect(state.taskList.notification).toContain("завершена");
  });

  it("одновременно может отображаться только одно", async () => {
    const store = createTestStore();

    store.dispatch(addTask(`Задача 1`));
    store.dispatch(addTask(`Задача 2`));
    store.dispatch(addTask(`Задача 3`));

    render(<App store={store} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    const firstNotification = await screen.findByText(/Задача 1.*завершена/i);
    expect(firstNotification).toBeInTheDocument();

    fireEvent.click(checkboxes[2]);

    await waitFor(() => {
      expect(
        screen.queryByText(/Задача 1.*завершена/i),
      ).not.toBeInTheDocument();
    });

    const secondNotification = await screen.findByText(/Задача 2.*завершена/i);
    expect(secondNotification).toBeInTheDocument();

    const notifications = screen.queryAllByText(/задача \d.*завершена/i);
    expect(notifications).toHaveLength(1);

    expect(store.getState().taskList.notification).toContain("Задача 2");
  });
});
