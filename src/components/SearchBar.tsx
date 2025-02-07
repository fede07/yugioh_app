import React ,{useState} from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query)
    }
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search cards..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeydown}
        className="flex-1 p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <button onClick={clearSearch} className="p-2 text-red-500 font-bold">
          ✖
        </button>
      )}
    </div>
  )
}

export default SearchBar
