import { Card } from '../types/Card.ts'
import AttributeIcon from './AttributeIcon.tsx'
import { Description } from './Description.tsx'

interface PendulumCardFrameProps {
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

const PendulumCardFrame = ({ card, style }: PendulumCardFrameProps) => {
  return (
    <div
      className={`block border-10 rounded-lg shadow-lg ${style.bg} border-gray-600
                  w-[300px] h-[425x] flex flex-col space-y-1 p-3`}
    >
      {/* Title */}
      <div
        className={`flex flex-row justify-between border-2 p-1 pl-1 text-left ${style.borderTopR} ${style.borderTopL}`}
      >
        <h2 className={`text-md font-bold truncate ${style.title}`}>{card.name}</h2>
        <AttributeIcon card={card} />
      </div>

      {/* Card level */}

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

      <div className="relative">

        {/* IMAGE */}
        <div className="flex justify-center items-center pr-0 pl-0 pt-0 pb-5 ">
          <img
            src={card.card_images[0].image_url_cropped}
            alt={card.name}
            className={`w-full object-contain rounded-sm border-4 border-gray-700`}
          />
        </div>
        {/* Pendulum Description */}
        <div className="absolute bottom-0 grid-rows-2 space-y-0 bg-teal-200 border-3 border-gray-700 text-black">
          <div className="flex flex-row rounded-sm text-xs overflow-hidden">
            {/* Left Pendulum */}
            <div className="flex flex-col px-2 py-1 border-r-3 border-gray-700 font-extrabold">
              <p className="text-xl text-blue-500 arrow-diamond">←</p>
              <p className="text-black text-center">{card.scale}</p>
            </div>

            {/* Monster Description */}
            <div className="p-2">
              <p className="line-clamp-3">{card.pend_desc}</p>
            </div>

            {/* Right Pendulum */}
            <div className="flex flex-col px-2 py-1 border-l-3 border-gray-700 font-extrabold">
              <p className="text-xl text-red-500">→</p>
              <p className="text-black text-center">{card.scale}</p>
            </div>
          </div>
          {/* Spell Description */}
          <Description card={card} style={style} isPendulum={true}/>
        </div>
      </div>

    </div>
  )
}

export default PendulumCardFrame
