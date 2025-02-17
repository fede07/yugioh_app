import { useEffect, useState } from 'react'
import { getCardById, getCardsByArchetype } from '../../services/api.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from '../../types/Card.ts'
import CardFrame from '../../components/CardFrame.tsx'
import Loader from '../../components/Loader.tsx'
import { Undo2 } from 'lucide-react'
import { CardInfo } from '../../components/CardInfo.tsx'

const CardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<Card>()
  const [loading, setLoading] = useState(true)
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [relatedCards, setRelatedCards] = useState<Card[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    if (id != null) {
      setLoading(true)
      getCardById(id).then((data) => {
        setCard(data)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (card?.archetype) {
      setLoadingRelated(true)
      getCardsByArchetype(card.archetype).then((relCards) => {
        const filteredCards = relCards.filter((card) => card.id !== Number(id))
        setRelatedCards(filteredCards)
        setLoadingRelated(false)
      })
    } else {
      setRelatedCards([])
      setLoadingRelated(false)
    }
  }, [card?.archetype, card?.id, id])

  if (loading)
    return (
      <div className="flex flex-col justify-center place-items-center h-screen w-full">
        <Loader />
      </div>
    )
  if (!card || !card.id)
    return (
      <div className="text-center text-white flex flex-col justify-center place-items-center h-screen w-full">
        Card not found
      </div>
    )

  return (
    <div className="flex flex-col gap-4 mx-auto place-items-center p-4 sm:p-8 min-h-screen w-full">
      <div className="container mx-auto p-4 bg-gray-900 rounded-md border-2 border-gray-400 relative">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 z-50 bg-indigo-950/80 hover:bg-indigo-800 border-gray-400 border-2 p-3 sm:p-4 rounded-md transition-colors"
        >
          <Undo2 color="#ffffff" strokeWidth={2.25} size={32} />
        </button>

        {/* CARD INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 items-center">
          <div className="flex justify-center">
            <CardFrame card={card} to={`/card/${card.id}`} />
          </div>
          <CardInfo card={card} />
        </div>

        {/* BANLIST */}
        <div className="p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white font-mono mt-4">
          <h2 className="font-semibold text-lg">Banlist</h2>
          {card.banlist_info ? (
            <div className="p-2 flex gap-2 flex-wrap">
              <span
                className={`px-2 py-1 rounded-md text-xs ${card.banlist_info.ban_ocg ? 'bg-red-500' : 'bg-green-500'}`}
              >
                OCG: {card.banlist_info.ban_ocg || 'Unlimited'}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${card.banlist_info.ban_tcg ? 'bg-yellow-500' : 'bg-green-500'}`}
              >
                TCG: {card.banlist_info.ban_tcg || 'Unlimited'}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${card.banlist_info.ban_goat ? 'bg-blue-500' : 'bg-green-500'}`}
              >
                GOAT: {card.banlist_info.ban_goat || 'Unlimited'}
              </span>
            </div>
          ) : (
            <p className="p-2">Unlimited</p>
          )}
        </div>

        {/* RELATED CARDS */}
        <div className="p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white mt-3 font-mono">
          <h2 className="font-semibold text-lg">Related Cards</h2>
          {loadingRelated ? (
            <div className="flex justify-center items-center h-[50px]">
              <Loader />
            </div>
          ) : relatedCards.length === 0 ? (
            <p className="p-2">No related cards</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2">
              {relatedCards.map((relCard) => (
                <li key={relCard.id}>
                  <Link
                    to={`/card/${relCard.id}`}
                    className="flex items-center gap-2 border-2 border-gray-400 rounded-md p-2 hover:bg-indigo-900 transition-colors"
                  >
                    <img
                      src={relCard.card_images[0].image_url_small}
                      alt={relCard.name}
                      className="w-12 h-auto rounded-sm shadow-md"
                    />
                    <span className="truncate">{relCard.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardDetail
