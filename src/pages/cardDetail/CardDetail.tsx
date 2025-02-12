import { useEffect, useState } from 'react'
import { getCardById, getCardsByArchetype } from '../../services/api.tsx'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../../types/Card.ts'
import CardComponent from '../../components/CardComponent.tsx'
import { LOGO_IMG_PUBLIC } from '../../constants/assets.ts'
import NavigationBar from '../../components/NavigationBar.tsx'
import AttributeIcon from '../../components/AttributeIcon.tsx'

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

  if (loading) return <div className="text-center">Loading...</div>
  if (!card || !card.id)
    return <div className="text-center text-white">Card not found</div>

  const hasAttack = !!card.atk
  const hasDefense = !!card.def

  return (
    <div className="flex flex-col mx-auto p-8 ">
      <NavigationBar image={LOGO_IMG_PUBLIC}/>
      <div className="container mx-auto p-4 bg-gray-900 rounded-md border-2 border-gray-400">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <CardComponent card={card} />
          </div>

          <div className="flex-row w-full p-1 border-2 border-gray-400 rounded-md bg-indigo-950 text-white">
            {/*Title*/}
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold, text-center, m-4">
                {card.name}
              </h1>
              <div className={'p-4 scale-150'}>
                <AttributeIcon card={card} />
              </div>

            </div>
            {/*Info*/}
            <div className="flex flex-col p-4">
              <p>Level {card.level}</p>
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
            <div className={'p-4'}>
              <p>{card.typeline?.join('/')}</p>
              {card.desc.split(/\r\n/).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
        {/*Ban Info*/}
        <div className="p-4 border-2 border-gray-400 rounded-md bg-indigo-950 text-white">
          <h2>Banlist</h2>
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
          <h2>Related cards</h2>
          <ul className={'grid grid-cols-3 p-2'}>
            {relatedCards.map((relCard) => (
              <li key={relCard.id} className={'p-0'}>
                <Link to={`/card/${relCard.id}`}>{relCard.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CardDetail
