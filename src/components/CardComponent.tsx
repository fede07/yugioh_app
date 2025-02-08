import {Link} from "react-router-dom"
import {Card} from "../types/Card.ts"
import {getCardStyles} from "../utils/cardStyles.ts"
import Arrow from "./Arrow.tsx"

interface CardProps {
  card: Card
}

const POSITIONS = [
  "Top",
  "Top-Right",
  "Right",
  "Bottom-Right",
  "Bottom",
  "Bottom-Left",
  "Left",
  "Top-Left",
]

const CardComponent = ({card}: CardProps) => {

  const {bg ,title ,borderTopR, borderTopL ,descBg ,borderDesc} = getCardStyles(card.frameType)

  const isPendulum = card.type.includes("Pendulum")
  const isNormal = card.type.includes("Normal")
  const isEffect = card.type.includes("Effect")
  const isMonster = card.type.includes("Monster")
  const isLink = card.type.includes("Link")
  const isSpellOrTrap = card.type.includes("Spell") || card.type.includes("Trap")

  console.log(isPendulum)
  console.log(isNormal)
  console.log(isEffect)

  return (
    <Link
      to={`/card/${card.id}`}
      className={`block border-8 rounded-lg shadow-lg hover:scale-105 transition ${bg} border-gray-600
                  w-[300px] h-[425x] flex flex-col space-y-1 p-3`}
    >
      {/* Title */}
      <div className={`border-2 p-1 pl-1 text-left ${borderTopR} ${borderTopL}`}>
        <h2 className={`text-md font-bold truncate ${title}`}>{card.name}</h2>
      </div>

      {/* Card Type */}
      {(!isMonster) && <p className="text-sm text-right font-semibold pr-4">[{card.type}]</p>}
      {(card.type != "Trap Card" && card.type != "Spell Card") &&
          <div className="flex justify-end pr-4 text-yellow-500">
            {Array.from({length: card.level || 0} ,(_ ,i) => (
              <span key={i}
                    className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center font-bold text-sm">★</span>
            ))}
          </div>
      }

      {(isLink) &&
          <div className="p-1"></div>
      }

      {!isPendulum? (
        <div className="relative">
          <div className="flex justify-center items-center pr-2 pl-2 pt-0 pb-0 ">
            <img
              src={card.card_images[0].image_url_cropped}
              alt={card.name}
              className={`w-full object-contain rounded-sm border-4 border-gray-700`}
            />
          </div>

          {isLink? (
            <div className="absolute inset-0 flex items-center justify-center">
              {POSITIONS?.map((pos, idx) => {
                const isActive = card.linkmarkers?.includes(pos)
                return <Arrow position={pos} isActive={Boolean(isActive)} key={idx}/>
              })}
            </div>
          ) : (
            <></>
          ) }

        </div>
      ) : (
        <></>
      )}

      {/* Description */}

      {isPendulum ? (
        <div className="relative">
          <div className="flex justify-center items-center pr-0 pl-0 pt-0 pb-0 ">
            <img
              src={card.card_images[0].image_url_cropped}
              alt={card.name}
              className={`w-full object-contain rounded-sm border-4 border-gray-700`}
            />
          </div>

          <div className="absolute bottom-0 grid-rows-2 space-y-0 bg-teal-200 border-3 border-gray-700">
            <div className="flex flex-row rounded-sm text-xs overflow-hidden">
              {/* Left Pendulum */}
              <div className="flex flex-col px-2 py-1 border-r-3 border-gray-700 font-extrabold">
                <p className="text-xl text-blue-500"> ←</p>
                <p className="text-black text-center">{card.scale}</p>
              </div>

              {/* Monster Description */}
              <div className="p-2" >
                <p className="line-clamp-3">{card.pend_desc}</p>
              </div>

              {/* Right Pendulum */}
              <div className="flex flex-col px-2 py-1 border-l-3 border-gray-700 font-extrabold">
                <p className="text-xl text-red-500">→</p>
                <p className="text-black text-center">{card.scale}</p>
              </div>
            </div>
            {/* Spell Description */}
            <div className="p-0 text-xs border-t-3 border-gray-700">
              <p className={`font-bold pl-1 pr-1 ${borderDesc}`}>
                [{card.typeline?.join("/")}]
              </p>
              <p className="line-clamp-3 pl-1 pr-1">{card.monster_desc}</p>
              <div className="flex justify-end space-x-1 text-xs border-t-1 ">
                {card.atk && <p className="text-right text-xs">ATK/{card.atk}</p>}
                {card.def && <p className="text-right text-xs">DEF/{card.def}</p>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Description */}
          <div className={`flex flex-col justify-between p-1 border-2 rounded-sm overflow-hidden text-xs ${borderDesc} ${descBg} h-[90px] mt-2`}>
            {isSpellOrTrap? (
              <p className="line-clamp-4">{card.desc}</p>
            ):(
              <>
                <p className="line-clamp-3 font-semibold">
                [{card.typeline?.join("/")}]
                </p>
                <p className="line-clamp-3">{card.desc}</p>
                <div className="bottom-0 flex justify-end space-x-1 text-xs border-t-1 ">
                  {card.atk && <p className="text-right text-xs">ATK/{card.atk===-1? " ?" : card.atk}</p>}
                  {isLink? (
                    <p className="font-extrabold pl-3 pr-2 scale-x-150">LINK-{card.linkval}</p>
                  ) : (
                    <>
                      {card.def && <p className="text-right text-xs">DEF/{card.def}</p>}
                    </>
                    )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Link>
  )
}

export default CardComponent
