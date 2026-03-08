type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};
export const FilterDoneButton = ({ onChange, disabled }: Props) => {
  return (
    <label className="checkbox-field-label">
      <input type="checkbox" onChange={onChange} defaultChecked={false} />
      Скрыть выполненные
    </label>
  );
};
