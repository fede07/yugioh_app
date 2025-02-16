import { Card } from '../types/Card.ts'
import AttributeIcon from './AttributeIcon.tsx'
import Description from './Description.tsx'

interface DefaultCardFrameProps {
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

const DefaultCardFrame = ({ card, style }: DefaultCardFrameProps) => {

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


      <div className="flex justify-end pr-4 text-yellow-500">
        {Array.from({ length: card.level || 0 }, (_, i) => (
          <span
            key={i}
            className={
              "bg-gradient-to-br from-orange-500 to-red-700 rounded-full w-4 h-4 flex items-center justify-center font-bold text-md"
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
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'public/image-off.png'
            }}
          />
        </div>
      </div>

      {/* Descripción */}
      <Description card={card} style={style} isPendulum={false}/>
    </div>
  )
}

export default DefaultCardFrame
