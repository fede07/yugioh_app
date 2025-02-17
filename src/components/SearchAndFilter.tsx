import React ,{ useState } from 'react'
import {
  CARD_TYPES_GENERAL,
  CARD_TYPES_MONSTERS,
  CARD_TYPES_SPELLS,
  CARD_TYPES_TRAPS,
} from '../constants/cardTypes.ts'
import { ATTRIBUTES_NAMES } from '../constants/cardAttributes.ts'
import { RACES_MONSTERS } from '../constants/cardRaces.ts'
import Selector from './Selector.tsx'
import Slider from './Slider.tsx'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

interface Props {
  image: string
  onApplyFilters: (query: { search: string; filters: string }) => void
  onShowAdvanced: () => void
}

const SearchAndFilter = ({ image, onApplyFilters, onShowAdvanced }: Props) => {
  const [search, setSearch] = useState('')
  const [selectedCardType, setSelectedCardType] = useState<string | null>()
  const [filters, setFilters] = useState<{
    [key: string]: string | number | null
  }>({
    type: '',
    attribute: '',
    level: null,
    race: '',
    atk: '',
    def: '',
  })

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: string, value: string | number | null) => {
    if (key === 'level' && value === 0) {
      value = null
    }

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const applyFilters = () => {

    const updatedFilters = {
      ...filters,
    }

    if (selectedCardType === 'Monster Card') {
      updatedFilters.type = filters.type
    } else {
      updatedFilters.type = selectedCardType || ''
    }

    const filterQuery = Object.entries(updatedFilters)
      .filter(([, val]) => val !== null && val !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    toggleFilters()

    onApplyFilters({
      search,
      filters: filterQuery,
    })
  }

  const resetFilters = () => {
    setSearch('')
    setFilters({
      type: '',
      attribute: '',
      level: null,
      race: '',
      atk: null,
      def: null,
    })
    onApplyFilters({ search: '', filters: '' })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters()
    }
  }

  const handleCardTypeChange = (mainType: string) => {
    setSelectedCardType(mainType)
    setFilters({
      type: '',
      attribute: '',
      level: null,
      race: '',
      atk: null,
      def: null,
    })
  }

  const backHome = () => {
    setSearch('')
    setFilters({
      type: '',
      attribute: '',
      level: null,
      race: '',
      atk: null,
      def: null,
    })
    setSelectedCardType(undefined)
    onApplyFilters({ search: '', filters: '' })
    navigate("/", { replace: true })
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
    onShowAdvanced()
  }

  return (
    <div className=" container bg-gray-200 rounded-lg shadow-md mb-4 m-auto">
      <div className="fixed xl:mx-44 top-0 left-0 right-0 z-50 flex items-center gap-2 p-2 bg-gray-200 rounded-lg shadow-md">
        <button onClick={backHome} className={"flex-none hover:cursor-pointer hover:scale-110"}>
          <img src={image} alt={'Logo'} className={'w-12 h-12'} />
        </button>
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 max-w-xs sm:max-w-xl p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button onClick={applyFilters} className="p-2 text-green-500 font-bold">
          <Search strokeWidth="4" color={'#000000'} />
        </button>
        {search && (
          <button onClick={resetFilters} className="p-2 text-red-500 font-bold">
            ✖
          </button>
        )}

        <button
          onClick={toggleFilters}
          className="px-3 py-2 bg-gray-200 text-gray-500 rounded-lg mt-2 text-center justify-center -translate-y-1 hover:cursor-pointer hover:scale-110"
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>

      {isOpen && (
        <div className={'p-4'}>
          <div className="pt-12">
            <div className={'text-black'}>
              <Selector
                array={CARD_TYPES_GENERAL}
                name={'Card Type'}
                onChange={handleCardTypeChange}
                initialValue={selectedCardType ?? undefined}
              />
            </div>

            {selectedCardType === 'Monster Card' && (
              <div
                className={
                  'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4'
                }
              >
                <Selector
                  array={CARD_TYPES_MONSTERS}
                  name="Type"
                  onChange={(val) => updateFilter('type', val)}
                  initialValue={typeof filters.type === 'string' ? filters.type : undefined}
                />
                <Selector
                  array={ATTRIBUTES_NAMES}
                  name="Attribute"
                  onChange={(val) => updateFilter('attribute', val)}
                  initialValue={typeof filters.attribute === 'string' ? filters.attribute : undefined}
                />
                <Slider
                  name="Level"
                  onChange={(val) => updateFilter('level', val)}
                  initialValue={typeof filters.level === 'number' ? filters.level : 0}
                />
                <Selector
                  array={RACES_MONSTERS}
                  name="Monster Race"
                  onChange={(val) => updateFilter('race', val)}
                  initialValue={typeof filters.race === 'string' ? filters.race : undefined}
                />
                <input
                  type="number"
                  placeholder="ATK"
                  onChange={(e) => updateFilter('atk', e.target.value)}
                  className="no-arrows border border-gray-400 rounded-md p-1"
                  value={filters.atk? filters.atk : ''}
                />
                <input
                  type="number"
                  placeholder="DEF"
                  onChange={(e) => updateFilter('def', e.target.value)}
                  className="no-arrows border border-gray-400 rounded-md p-1"
                  value={filters.def? filters.def : ''}
                />
              </div>
            )}

            {selectedCardType === 'Spell Card' && (
              <div
                className={
                  'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4'
                }
              >
                <Selector
                  array={CARD_TYPES_SPELLS}
                  name={'Spell Type'}
                  onChange={(val) => updateFilter('race', val)}
                  initialValue={typeof filters.race === 'string' ? filters.race : undefined}
                />
              </div>
            )}

            {selectedCardType === 'Trap Card' && (
              <div
                className={
                  'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-4'
                }
              >
                <Selector
                  array={CARD_TYPES_TRAPS}
                  name={'Trap Type'}
                  onChange={(val) => updateFilter('race', val)}
                  initialValue={typeof filters.race === 'string' ? filters.race : undefined}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="px-3 py-2 bg-gray-200 text-black rounded-lg border border-gray-400 w-[100px]"
              onClick={applyFilters}
            >
              Search!
            </button>
            <button
              className="px-3 py-2 bg-gray-200 text-black rounded-lg border border-gray-400 w-[100px]"
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
