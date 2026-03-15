import { render } from "@testing-library/react";
import { List } from "src/components/List";
import { createTestStore } from "src/store/configureStore";
import {
  addTask,
  completeCount,
  tasksSelector,
  uncompleteCount,
} from "src/store/taskSlice";

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />,
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {
  const store = createTestStore();

  for (let i = 1; i <= 15; i++) {
    store.dispatch(addTask(`Задача ${i}`));
  }

  expect(tasksSelector(store.getState()).length).toBe(10);
  expect(uncompleteCount(store.getState())).toBe(10);
  expect(completeCount(store.getState())).toBe(0);
});
