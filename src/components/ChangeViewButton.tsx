import { useState } from 'react'
import { List, Grid } from 'lucide-react'

interface ChangeViewButtonProps {
  onChange: (newState: boolean) => void
}

const ChangeViewButton = ({ onChange }: ChangeViewButtonProps) => {
  const [isListView, setIsListView] = useState(true)

  const toggleView = () => {
    const newState = !isListView
    setIsListView(newState)
    onChange(newState)
  }

  return (
    <button
      onClick={toggleView}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md transition hover:bg-gray-300 hover:cursor-pointer"
    >
      {isListView ?  <List size={20}/> : <Grid size={20}/>}
      <span className="font-semibold">
        {isListView ? 'List View' : 'Grid View'}
      </span>
    </button>
  )
}

export default ChangeViewButton
