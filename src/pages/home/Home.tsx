import {useEffect ,useState} from "react"
import {getAllCards} from "../../services/api.tsx"
import CardComponent from "../../components/CardComponent.tsx"
import {Card} from "../../types/Card.ts"

const Home = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCards().then((data) => {
      setCards(data.slice(0, 9))
      setLoading(false)
    })
  } ,[])

  if (loading) return <div className="text-center">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold, text-center, m-4">Yu-Gi-Oh!</h1>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Home
