import { useEffect, useState } from 'react'
import { getCardById, getCardsByArchetype } from '../../services/api.tsx'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../../types/Card.ts'
import AttributeIcon from '../../components/AttributeIcon.tsx'
import CardFrame from '../../components/CardFrame.tsx'
import Loader from '../../components/Loader.tsx'
import { Undo2 } from 'lucide-react'

const CardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<Card>()
  const [loading, setLoading] = useState(true)
  const [relatedCards, setRelatedCards] = useState<Card[]>([])

  useEffect(() => {
    if (id != null) {
      getCardById(id).then((data) => {
        setCard(data)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (card?.archetype) {
      getCardsByArchetype(card.archetype).then((relCards) => {
        const filteredCards = relCards.filter((card) => card.id !== Number(id))
        setRelatedCards(filteredCards)
      })
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

  const hasAttack = !!card.atk
  const hasDefense = !!card.def

  return (
    <div className="flex flex-col mx-auto place-items-center p-8 h-screen w-full">
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

          <div className="flex-row w-full py-6 border-2 border-gray-400 rounded-md bg-indigo-950 text-white">
            {/*Title*/}
            <div className="flex flex-row justify-items-start text-center justify-center">
              <h1 className="text-2xl font-bold, text-center, m-4">
                {card.name}
              </h1>
              <div className={'p-4 scale-150'}>
                <AttributeIcon card={card} />
              </div>
            </div>
            {/*Info*/}
            <div className="flex flex-col p-4">
              {(card.level !== null && card.level !== undefined) ? <p>Level {card.level}</p> : <span />}
              {(card.linkval !== undefined) ? <p>LINK-{card.linkval}</p> : <span />}
              <p>{card.race} </p>
              <p>{card.attribute}</p>
              <div className="flex-col">
                {hasAttack ? (
                  <p>ATK/ {card.atk === -1 ? ' ?' : card.atk}</p>
                ) : (
                  <></>
                )}
                {hasDefense ? (
                  <p>DEF/ {card.def === -1 ? ' ?' : card.def}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={'p-4 justify-items-start justify-center'}>
              <p>{card.typeline?.join('/')}</p>
              {card.desc.split(/\r\n/).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
        {/*Ban Info*/}
        <div className="p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white">
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
            'p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white'
          }
        >
          <h2 className={'font-semibold text-lg'} >Related cards</h2>
          <ul className={'grid grid-cols-3 p-2'}>
            {relatedCards.map((relCard) => (
              <li key={relCard.id} className={'p-0'}>
                <Link to={`/card/${relCard.id}`}>
                  <div className={'p-2 border-2 border-gray-400 rounded-md truncate hover:bg-indigo-900'}>
                    {relCard.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CardDetail
