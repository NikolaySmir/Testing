import { ChangeEvent, useState } from "react";
import { AddButton } from "src/components/AddButton";
import { Input } from "src/components/Input";
import { validateHeaderMax, validateHeaderMin } from "src/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  setHideCompleted,
  uncompleteCount,
} from "src/store/taskSlice";

import "./styles.css";
import { FilterDoneButton } from "src/components/FilterDoneButton";

export const NewTaskBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const uncomplete = useSelector(uncompleteCount);

  const handleAdd = () => {
    if (validateHeaderMax(value)) {
      dispatch(addTask(value));
      setValue("");
    }
  };

  const handleShowCompletedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = e.target.checked;
    dispatch(setHideCompleted(isChecked));
  };

  const disabled =
    !validateHeaderMin(value) || !validateHeaderMax(value) || uncomplete >= 10;

  return (
    <div className="new-task-bar">
      <Input
        value={value}
        onChange={(val) => setValue(val)}
        disabled={uncomplete >= 10}
        disabledMessage="Нельзя завести больше 10 невыполненных задач"
      />
      <AddButton onClick={handleAdd} disabled={disabled} />
      <FilterDoneButton
        onChange={handleShowCompletedChange}
        disabled={disabled}
      />
    </div>
  );
};
