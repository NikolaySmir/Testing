type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const FilterDoneButton = ({ onChange }: Props) => {
  return (
    <label className="checkbox-field-label">
      <input type="checkbox" onChange={onChange} defaultChecked={false} />
      Скрыть выполненные
    </label>
  );
};
