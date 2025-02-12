import { Card } from '../types/Card.ts'
import { getCardStyles } from '../utils/cardStyles.ts'

interface DefaultCardFrameProps {
  card: Card
}

const DefaultCardFrame = ({ card }: DefaultCardFrameProps) => {
  const { bg, title, borderTopR, borderTopL, descBg, borderDesc } = getCardStyles(card.frameType)
  // const isSpellOrTrap = card.type.includes('Spell') || card.type.includes('Trap')
  const isLink = card.type.includes('Link')

  return (
    <div
      className={`block border-10 rounded-lg shadow-lg ${bg} border-gray-600 w-[300px] h-[425px] flex flex-col p-3`}
    >
      {/* Título */}
      <div
        className={`flex justify-between border-2 p-1 ${borderTopR} ${borderTopL}`}
      >
        <h2 className={`text-md font-bold truncate ${title}`}>{card.name}</h2>
      </div>

      {/* Imagen */}
      <div className="flex justify-center items-center">
        <img
          src={card.card_images[0].image_url_cropped}
          alt={card.name}
          className="w-full object-contain rounded-sm border-4 border-gray-700"
        />
      </div>

      {/* Descripción */}
      <div
        className={`p-2 border-2 rounded-sm text-xs ${borderDesc} ${descBg} h-[90px] mt-2`}
      >
        <p className="font-semibold">[{card.typeline?.join('/')}]</p>
        <p className="line-clamp-3">{card.desc}</p>
        <div className="flex justify-end space-x-1 text-xs border-t-1">
          {card.atk !== undefined && <p>ATK/ {card.atk}</p>}
          {!isLink && card.def !== undefined && <p>DEF/ {card.def}</p>}
        </div>
      </div>
    </div>
  )
}

export default DefaultCardFrame
