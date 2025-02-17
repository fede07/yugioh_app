type SelectorProps = {
  array: string[];
  name?: string;
  initialValue?: string;
  onChange: (value: string) => void;
};

const Selector = ({ array, name, initialValue, onChange }: SelectorProps) => {

  let elementName = ""

  if (name !== undefined) {
   elementName = name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  return (
    <label className="block mb-2 font-bold text-gray-800">
      {(name !== undefined) ? ( <p>{elementName}:</p> ) : (<span/>)}
      <select
        className="block w-full p-2 mt-1 border rounded"
        onChange={(e) => onChange(e.target.value)}
        value={initialValue}
      >
        {(name !== undefined) ? ( <option value="">Select {elementName}</option> ) : (<></>)}
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
