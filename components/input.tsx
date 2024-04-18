type Props = {
  inputkey: string;
  inputPlaceholder: string;
  inputType: string;
  inputValue: any;
  inputLable: string;
  onchange: (e: any) => void;
};

export default function Input({
  inputkey,
  inputLable,
  inputPlaceholder,
  inputType,
  inputValue,
  onchange,
}: Props) {
  return (
    <div className="flex-1">
      <label className="" htmlFor={inputkey}>
        {inputLable}
      </label>
      <input
        placeholder={inputPlaceholder}
        className="w-full bg-gray-300 rounded-md border-gray-700 text-black px-2 py-1"
        id={inputkey}
        name={inputkey}
        type={inputType}
        value={inputValue}
        onChange={onchange}
      />
    </div>
  );
}
