type SelectorProps = {
  array: string[];
  name: string;
  onChange: (value: string) => void;
};

const Selector = ({ array, name, onChange }: SelectorProps) => {
  const elementName = name.slice(0, 1).toUpperCase() + name.slice(1);

  return (
    <label className="block mb-2">
      {elementName}:
      <select
        className="block w-full p-2 mt-1 border rounded"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {elementName}</option>
        {array.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Selector;
