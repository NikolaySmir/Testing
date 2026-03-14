import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Item } from "src/components/Item";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { createTestStore } from "src/store/configureStore";

const store = createTestStore();

describe("Элемент списка задач", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NewTaskBar />
      </Provider>,
    );
  });

  it("название не должно быть больше 32 символов", () => {
    const input = screen.getByTestId("input-field");
    const addButton = screen.getByRole("button");

    const shortText = "a".repeat(30);
    fireEvent.change(input, { target: { value: shortText } });

    expect(addButton).not.toBeDisabled();

    const longText = "a".repeat(33);
    fireEvent.change(input, { target: { value: longText } });

    expect(addButton).toBeDisabled();

    const hintText = screen.getByTestId("input-hint-text");
    expect(hintText).toHaveTextContent(
      "Длина заголовка не должна превышать 32 символа",
    );
  });

  it("название не должно быть пустым", () => {
    const addButton = screen.getByRole("button");
    expect(addButton).toBeDisabled();
  });

  it("нельзя удалять невыполненные задачи", () => {
    const taskNotComplete = {
      id: "task-1",
      header: "Задача 1",
      done: false,
    };
    const taskComplete = {
      id: "task-2",
      header: "Задача 2",
      done: true,
    };
    render(
      <Item {...taskNotComplete} onDelete={() => {}} onToggle={() => {}} />,
    );
    render(<Item {...taskComplete} onDelete={() => {}} onToggle={() => {}} />);
    const buttons: Array<HTMLElement> = screen.getAllByRole("button");
    const task1DeleteBtn: HTMLElement = buttons[1];
    const task2DeleteBtn: HTMLElement = buttons[2];
    expect(task1DeleteBtn).toBeDisabled();
    expect(task2DeleteBtn).not.toBeDisabled();
  });
});
