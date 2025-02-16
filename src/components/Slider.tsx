import { ChangeEvent, useState } from "react";

type LevelSliderProps = {
  name: string;
  onChange: (level: number) => void;
};

const Slider = ({ name, onChange }: LevelSliderProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = Number(event.target.value);
    setValue(newLevel);
    onChange(newLevel);
  };

  const elementName = name.slice(0, 1).toUpperCase() + name.slice(1);

  return (
    <label className="block mb-2">
      {elementName}:
      <div className="flex flex-col items-center space-y-2">
        <input
          type="range"
          min="0"
          max="12"
          value={value}
          onChange={handleChange}
          className="w-full cursor-pointer"
        />
        <label className="text-black text-sm">
          {elementName}: {value === 0 ? "Any" : value}
        </label>
      </div>
    </label>
  );
};

export default Slider;
