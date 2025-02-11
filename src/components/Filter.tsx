import {useState} from "react"
import {CARD_TYPES} from "../constants/cardTypes.ts"
import {ATTRIBUTES_NAMES} from "../constants/cardAttributes.ts"
import Slider from "./Slider.tsx"
import Selector from "./Selector.tsx"
import {RACES_MONSTERS} from "../constants/cardRaces.ts"

const Filter = ({ onFilterChange }: { onFilterChange: (filters: string) => void }) => {
  const [isOpen, setIsOpen ] = useState(false)
  const [,setFilters] = useState<{ [key: string]: string | number | null }>({
    type: "",
    attribute: "",
    level: null,
    race: "",
    minAtk: null,
    maxAtk: null,
    minDef: null,
    maxDef: null,
  })

  const updateFilter = (key: string, value: string | number | null) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };

      const queryString = Object.entries(updatedFilters)
        .filter(([, val]) => val !== null && val !== "")
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join("&");

      onFilterChange(queryString);
      return updatedFilters;
    })
  }

  return (
    <div className="bg-gray-200 rounded-lg p-2 shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg"
      >
        {isOpen ? "Filter ▲" : "Filter ▼"}
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4 ">
          <Selector array={CARD_TYPES} name="Type" onChange={(val) => updateFilter("type", val)}/>
          <Selector array={ATTRIBUTES_NAMES} name={"Attribute"} onChange={(val => updateFilter("attribute", val))}/>
          <Slider name={"Level"} onChange={(val) => updateFilter("level", val)} />
          <Selector array={RACES_MONSTERS} name={"Monster Race"} onChange={val => updateFilter("race", val)}/>
          {/*<Selector array={RACES_SPELLS} name={"Spell Race"} onChange={val => updateFilter("race", val)}/>*/}
          {/*<Selector array={RACES_TRAPS} name={"Trap Race"} onChange={val => updateFilter("race", val)}/>*/}

        </div>
      )}
    </div>
  )
}

export default Filter
