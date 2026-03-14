import { render, screen } from "@testing-library/react";
import { createTestStore } from "src/store/configureStore";
import { Provider } from "react-redux";
import { List } from "src/components/List";
import { addTask, tasksSelector } from "src/store/taskSlice";

it("Список содержит не больше 10 невыполненных задач", () => {
  const store = createTestStore();

  for (let i = 1; i <= 15; i++) {
    store.dispatch(addTask(`Задача ${i}`));
  }

  render(
    <Provider store={store}>
      <List
        items={tasksSelector(store.getState())}
        onDelete={() => {}}
        onToggle={() => {}}
      />
    </Provider>,
  );

  const taskItems = screen.getAllByRole("listitem");
  expect(taskItems.length).toBe(10);
});
