import { Card } from '../types/Card.ts'
import AttributeIcon from './AttributeIcon.tsx'

interface SpellTrapCardFrameProps {
  card: Card
  style: {
    bg: string
    title: string
    borderTopR: string
    borderTopL: string
    descBg: string
    borderDesc: string
  }
}

export const SpellTrapCardFrame = ({ card, style }: SpellTrapCardFrameProps) => {
  return (
    <div
      className={`block border-10 rounded-lg shadow-lg ${style.bg} border-gray-600
                  w-[300px] h-[425x] flex flex-col space-y-1 p-3`}    >
      {/* Title */}
      <div
        className={`flex flex-row justify-between border-2 p-1 pl-1 text-left ${style.borderTopR} ${style.borderTopL}`}
      >
        <h2 className={`text-md font-bold truncate ${style.title}`}>{card.name}</h2>
        <AttributeIcon card={card} />
      </div>


      <div>
        <p className="text-sm text-right font-semibold pr-4 text-black">[{card.type}]</p>
      </div>

      {/* Imagen */}
      <div className="relative">
        <div className="flex justify-center items-center pr-2 pl-2 pt-0 pb-0 ">
          <img
            src={card.card_images[0].image_url_cropped}
            alt={card.name}
            className={`w-full object-contain rounded-sm border-4 border-gray-700`}
          />
        </div>
      </div>

      {/* Descripción */}
      <div
        className={`p-2 border-2 rounded-sm text-xs ${style.borderDesc} ${style.descBg} h-[90px] mt-2 text-black`}
      >
        <p className="line-clamp-3">{card.desc}</p>
        <div className="flex justify-end space-x-1 text-xs">
          {card.atk !== undefined && <p>ATK/ {card.atk}</p>}
          {card.def !== undefined && <p>DEF/ {card.def}</p>}
        </div>
      </div>
    </div>
  )
}
