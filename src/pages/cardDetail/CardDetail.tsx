import { useEffect, useState } from 'react'
import { getCardById, getCardsByArchetype } from '../../services/api.tsx'
import { Link, useParams } from 'react-router-dom'
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
    <div className="flex flex-col gap-4 mx-auto place-items-center p-8 h-screen w-full">
      <div className="container mx-auto p-4 bg-gray-900 rounded-md border-2 border-gray-400 relative">
        <Link
          className={
            'absolute top-1 right-1 z-50 bg-indigo-950 border-gray-400 border-2 p-4 rounded-md'
          }
          to={'/'}
        >
          <Undo2 color="#ffffff" strokeWidth={2.25} size={42} />
        </Link>
        <div className="flex flex-col md:flex-row gap-4 py-3">
          <div className={'content-center scale-80 sm:scale-100 md:scale-100'}>
            <CardFrame card={card} />
          </div>

          <CardInfo card={card}/>

        </div>
        {/*Ban Info*/}
        <div className="p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white font-mono">
          <h2 className={'font-semibold text-lg'}>Banlist</h2>
          {card.banlist_info ? (
            <div className="p-2">
              <p>OCG: {card.banlist_info?.ban_ocg}</p>
              <p>TCG: {card.banlist_info?.ban_tcg}</p>
              <p>GOAT: {card.banlist_info?.ban_goat}</p>
            </div>
          ) : (
            <p className="p-2">Unlimited</p>
          )}
        </div>
        {/*Related Cards*/}
        <div
          className={
            'p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white mt-3 font-mono'
          }
        >
          <h2 className={'font-semibold text-lg'}>Related cards</h2>
          {loadingRelated? (
            <div className="flex flex-col justify-center place-items-center h[50px] w-full">
              <Loader />
            </div>
          ): (
           <span>
             {relatedCards.length === 0 && <p className="p-2">No related cards</p>}
             <ul className={'grid grid-cols-3 p-2'}>
            {relatedCards.map((relCard) => (
              <li key={relCard.id} className={'p-0'}>
                <Link to={`/card/${relCard.id}`}>
                  <div
                    className={
                      'p-2 border-2 border-gray-400 rounded-md truncate hover:bg-indigo-900'
                    }
                  >
                    {relCard.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
           </span>
          )}

        </div>
      </div>
    </div>
  )
}

export default CardDetail
