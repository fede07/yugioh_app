import {Link} from "react-router-dom"
import {Card} from "../types/Card.ts"
import {getCardStyles} from "../utils/cardStyles.ts"

interface CardProps {
  card: Card
}

const CardComponent = ({ card }: CardProps) => {

  const { bg, title, border, descBg } = getCardStyles(card.type)

  return (
    <Link
      to={`/card/${card.id}`}
      className={`block border-8 rounded-lg shadow-lg hover:scale-105 transition ${bg} border-gray-600
                  w-[300px] h-[425x] flex flex-col space-y-1 p-3`}
    >
      {/* Title */}
      <div className={`border-2 p-1 pl-2 text-left ${border}`}>
        <h2 className={`text-md font-bold truncate ${title}`}>{card.name}</h2>
      </div>

      {/* Card Type */}
      <p className="text-sm text-right font-semibold pr-4">[{card.type}]</p>

      {/* Image */}
      <div className="flex justify-center items-center pr-2 pl-2 pt-0 pb-0 ">
        <img
          src={card.card_images[0].image_url_cropped}
          alt={card.name}
          className="w-full max-h-full object-contain rounded-sm border-4 justify-center border-gray-700"
        />
      </div>

      {/* Description */}
      <div className={`p-2 border-2 rounded-sm overflow-hidden text-xs border-orange-500 ${descBg} h-[80px] mt-2`}>
        <p className="line-clamp-3">{card.desc}</p>
      </div>
    </Link>
  )
}

export default CardComponent
