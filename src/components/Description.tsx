import { Card } from '../types/Card.ts'

interface DescriptionProps {
  card: Card
  style: {
    bg: string
    title: string
    borderTopR: string
    borderTopL: string
    descBg: string
    borderDesc: string
  }
  isPendulum: boolean
}

export const Description = ({ card, style, isPendulum }: DescriptionProps) => {
  return (
    <span>
      {isPendulum ? (
        <div className="p-0 text-xs border-t-3 border-gray-700">
          <p className={`font-bold pl-1 pr-1 ${style.borderDesc}`}>
            [{card.typeline?.join('/')}]
          </p>
          <p className="line-clamp-3 pl-1 pr-1">{card.monster_desc !== undefined? card.monster_desc : card.desc }</p>
          <div className="flex justify-end space-x-2 text-xs border-t-1">
            {card.atk !== undefined && (
              <p className="text-right text-xs font-semibold pr-1">
                ATK/ {card.atk === -1 ? ' ?' : card.atk}
              </p>
            )}
            {card.def !== undefined && (
              <p className="text-right text-xs font-semibold pr-1">
                DEF/ {card.def === -1 ? ' ?' : card.def}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-between p-0 border-2 rounded-sm text-xs ${style.borderDesc} ${style.descBg} h-[90px] mt-2 text-black`}
        >
          {card.typeline ? (
            <p className="font-semibold px-1">[{card.typeline?.join('/')}]</p>
          ) : (
            <span />
          )}

          <p className="line-clamp-3 px-1">{card.desc}</p>
          <div className="flex justify-end space-x-2 text-xs border-t-1 text-right font-semibold">
            {card.atk !== undefined && (
              <p className={'pr-1'}>ATK/ {card.atk === -1 ? "?" : card.atk}</p>
            )}
            {card.def !== undefined && (
              <p className={'pr-1'}>DEF/ {card.def === -1 ? "?" : card.def}</p>
            )}
          </div>
        </div>
      )}
    </span>
  )
}

export default Description
