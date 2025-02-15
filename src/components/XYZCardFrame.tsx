import AttributeIcon from './AttributeIcon.tsx'
import { Card } from '../types/Card.ts'
import Description from './Description.tsx'

interface XYZCardFrameProps {
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

export const XYZCardFrame = ({ card, style }: XYZCardFrameProps) => {
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


      <div className="flex justify-items-start pr-4 text-yellow-500">
        {Array.from({ length: card.level || 0 }, (_, i) => (
          <span
            key={i}
            className={
              'bg-gradient-to-br from-gray-700 to-gray-900 rounded-full w-4 h-4 flex items-center justify-center font-bold text-md border-1 border-gray-600'
            }
          >
              ★
            </span>
        ))}
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
      <Description card={card} style={style} isPendulum={false}/>
    </div>
  )
}

export default XYZCardFrame
