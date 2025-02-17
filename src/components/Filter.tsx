import { useState } from 'react'
import { CARD_TYPES } from '../constants/cardTypes.ts'
import { ATTRIBUTES_NAMES } from '../constants/cardAttributes.ts'
import Slider from './Slider.tsx'
import Selector from './Selector.tsx'
import { RACES_MONSTERS } from '../constants/cardRaces.ts'

const Filter = ({
  onFilterChange,
}: {
  onFilterChange: (filters: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<{
    [key: string]: string | number | null
  }>({
    type: '',
    attribute: '',
    level: null,
    race: '',
    minAtk: null,
    maxAtk: null,
    minDef: null,
    maxDef: null,
  })

  const updateFilter = (key: string, value: string | number | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const applyFilters = () => {
    const queryString = Object.entries(filters)
      .filter(([, val]) => val !== null && val !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    onFilterChange(queryString)
  }

  const resetFilters = () => {
    setFilters({
      type: '',
      attribute: '',
      level: null,
      race: '',
      minAtk: null,
      maxAtk: null,
      minDef: null,
      maxDef: null,
    })
    onFilterChange('')
  }

  return (
    <div className="bg-gray-200 rounded-lg p-2 shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg"
      >
        {isOpen ? 'Filter ▲' : 'Filter ▼'}
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4 ">
          <Selector
            array={CARD_TYPES}
            name="Type"
            onChange={(val) => updateFilter('type', val)}
          />
          <Selector
            array={ATTRIBUTES_NAMES}
            name={'Attribute'}
            onChange={(val) => updateFilter('attribute', val)}
          />
          <Slider
            name={'Level'}
            onChange={(val) => updateFilter('level', val)}
            initialValue={0}
          />
          <Selector
            array={RACES_MONSTERS}
            name={'Monster Race'}
            onChange={(val) => updateFilter('race', val)}
          />
          {/*<Selector array={RACES_SPELLS} name={"Spell Race"} onChange={val => updateFilter("race", val)}/>*/}
          {/*<Selector array={RACES_TRAPS} name={"Trap Race"} onChange={val => updateFilter("race", val)}/>*/}
          <div className="flex justify-center gap-4">
            <button
              className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg border border-gray-400 w-[100px]"
              onClick={applyFilters}
            >
              Search!
            </button>
            <button
              className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg border border-gray-400 w-[100px]"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
