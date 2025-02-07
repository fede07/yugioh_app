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
      className={`block border p-2 rounded-sm shadow-lg hover:scale-105 transition ${bg} ${border}`}
    >
      <div className={`border-2 p-1 ${border}`}>
        <h2 className={`text-md font-bold text-center ${title}`}>{card.name}</h2>
      </div>
      <p className="text-sm text-right">[{card.type}]</p>
      <img
        src={card.card_images[0].image_url_cropped}
        alt={card.name}
        className="w-full rounded-sm border-2"
      />
      <div className={`p-2 border-2 rounded-sm ${border} ${descBg}`}>
        <p className="text-sm">{card.desc}</p>
      </div>
    </Link>
  )
}

export default CardComponent
