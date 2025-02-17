import { Card } from '../types/Card.ts'
import DefaultCardFrame from './DefaultCardFrame.tsx'
import PendulumCardFrame from './PendulumCardFrame.tsx'
import LinkCardFrame from './LinkCardFrame.tsx'
import { getCardStyles } from '../utils/cardStyles.ts'
import { SpellTrapCardFrame } from './SpellTrapCardFrame.tsx'
import XYZCardFrame from './XYZCardFrame.tsx'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  card: Card
  to: string
}

const CardFrame = ({ card, to }: CardProps) => {
  const navigate = useNavigate()

  const isPendulum = card.type.includes('Pendulum')
  const isLink = card.type.includes('Link')
  const isXYZ = card.type.includes('XYZ')
  const isSpellOrTrap =
    card.type.includes('Spell') || card.type.includes('Trap')

  const styles = getCardStyles(card.frameType)

  return (
    <div
      className="block hover:scale-105 transition m-6 hover:cursor-pointer"
      onClick={() => navigate(to)}
    >
      {isPendulum ? (
        <PendulumCardFrame card={card} style={styles} />
      ) : isLink ? (
        <LinkCardFrame card={card} style={styles} />
      ) : isSpellOrTrap ? (
        <SpellTrapCardFrame card={card} style={styles} />
      ) : isXYZ ? (
        <XYZCardFrame card={card} style={styles} />
      ) : (
        <DefaultCardFrame card={card} style={styles} />
      )}
    </div>
  )
}

export default CardFrame
