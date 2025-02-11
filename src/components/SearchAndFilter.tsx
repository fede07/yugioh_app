import { useState } from 'react'
import { CARD_TYPES } from '../constants/cardTypes.ts'
import { ATTRIBUTES_NAMES } from '../constants/cardAttributes.ts'
import { RACES_MONSTERS } from '../constants/cardRaces.ts'
import Selector from './Selector.tsx'
import Slider from './Slider.tsx'

interface Props {
  onApplyFilters: (query: { search: string; filters: string }) => void
}

const SearchAndFilter = ({ onApplyFilters }: Props) => {
  const [search, setSearch] = useState('')
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

  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: string, value: string | number | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const applyFilters = () => {
    const filterQuery = Object.entries(filters)
      .filter(([, val]) => val !== null && val !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    onApplyFilters({
      search,
      filters: filterQuery
    })
  }

  const resetFilters = () => {
    setSearch('')
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
    onApplyFilters({ search: '', filters: '' })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters()
    }
  }

  return (
    <div className="bg-gray-200 rounded-lg p-2 shadow-md mb-4">
      <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <button onClick={resetFilters} className="p-2 text-red-500 font-bold">
            ✖
          </button>
        )}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg mt-2"
      >
        {isOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4">
          <Selector
            array={CARD_TYPES}
            name="Type"
            onChange={(val) => updateFilter('type', val)}
          />
          <Selector
            array={ATTRIBUTES_NAMES}
            name="Attribute"
            onChange={(val) => updateFilter('attribute', val)}
          />
          <Slider name="Level" onChange={(val) => updateFilter('level', val)} />
          <Selector
            array={RACES_MONSTERS}
            name="Monster Race"
            onChange={(val) => updateFilter('race', val)}
          />

          {/* Botones de acción */}
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

export default SearchAndFilter
