import {useEffect ,useState} from "react"
import {getCardById} from "../../services/api.tsx"
import {useParams} from "react-router-dom"
import {Card} from "../../types/Card.ts"
import CardComponent from "../../components/CardComponent.tsx"

const CardDetail = () => {
  const { id } = useParams<{"id": string}>()
  const [card, setCard] = useState<Card>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id != null) {
      getCardById(id).then((data) => {
        setCard(data)
        setLoading(false)
      })
    }
  } ,[id])

  if (loading) return <div className="text-center">Loading...</div>
  if (!card) return <div className="text-center">Card not found</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold, text-center, m-4">{card.name}</h1>
      <div className="card">
        <img src={card.card_images[0].image_url} alt={card.name} />
        <p className="mt-2 text-lg">{card.type}</p>
        <p className="mt-2 text-sm">{card.desc}</p>
      </div>
      <CardComponent card={card} />
    </div>
  )
}

export default CardDetail
