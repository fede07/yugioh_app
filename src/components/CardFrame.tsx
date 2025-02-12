import { Link } from 'react-router-dom'
import { Card } from '../types/Card.ts'
import DefaultCardFrame from './DefaultCardFrame.tsx'
import PendulumCardFrame from './PendulumCardFrame.tsx'
import LinkCardFrame from './LinkCardFrame.tsx'

interface CardProps {
  card: Card
}

const CardComponent = ({ card }: CardProps) => {
  const isPendulum = card.type.includes('Pendulum')
  const isLink = card.type.includes('Link')

  return (
    <Link to={`/card/${card.id}`} className="block">
      {isPendulum ? (
        <PendulumCardFrame card={card} />
      ) : isLink ? (
        <LinkCardFrame card={card} />
      ) : (
        <DefaultCardFrame card={card} />
      )}
    </Link>
  )
}

export default CardComponent
