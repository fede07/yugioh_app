import {useEffect ,useState} from "react"
import {getAllCards  ,getCardsByName} from "../../services/api.tsx"
import CardComponent from "../../components/CardComponent.tsx"
import {Card} from "../../types/Card.ts"
import SearchBar from "../../components/SearchBar.tsx"

const Home = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restart, setRestart] = useState(false)

  useEffect(() => {
    getAllCards().then((data) => {
      setCards(data.slice(0, 12))
      setLoading(false)
      setRestart(false)
    }).catch(() => {
      setError("Cannot load cards.")
      setLoading(false)
    })
  } ,[restart])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  const handleSearch = async (query: string) => {
    if (!query || query.trim() === "") {
      setCards(cards)
      setRestart(true)
      return
    }
    setLoading(true)
    const lowerCaseQuery = query.toLowerCase()
    const result = await getCardsByName(lowerCaseQuery)
    setCards(result || [])
    setLoading(false)
  }

  return (
    <div className="container p-4 m-auto">
      <h1 className="text-2xl font-bold, text-center, m-4">Yu-Gi-Oh!</h1>

      <div className="p-6">
        <SearchBar onSearch={handleSearch}/>
      </div>

      <div className="grid gap-y-3 gap-x-0 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Home
