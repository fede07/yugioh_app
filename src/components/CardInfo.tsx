import { Card } from '../types/Card.ts'
import AttributeIcon from './AttributeIcon.tsx'
import CardLevel from './CardLevel.tsx'

interface CardInfoProps {
  card: Card
}

export const CardInfo = ({ card }: CardInfoProps) => {
  const hasAttack = !!card.atk
  const hasDefense = !!card.def

  return (
    <div className="flex-row w-full py-6 border-2 border-gray-400 rounded-md bg-indigo-950 text-white font-mono">
      {/*Title*/}
      <div className="flex flex-row justify-items-start text-center justify-center font-mono">
        <h1 className="text-2xl font-bold, text-center, m-4">{card.name}</h1>
        <div className={'p-4 scale-150'}>
          <AttributeIcon card={card} />
        </div>
      </div>

      {card.level ? (
        <div className={'flex flex-row justify-center scale-150 font-sans'}>
          <CardLevel level={card.level} type={card.type} />
        </div>
      ) : (
        <span />
      )}

      {/*Info*/}
      <div className="flex flex-col p-4">
        {card.type !== undefined ? <p>Type: {card.type}</p> : <span />}
        {card.race !== undefined ? <p>{card.race}</p> : <span />}
        {card.level !== null && card.level !== undefined ? (
          <p>Level {card.level}</p>
        ) : (
          <span />
        )}
        {card.linkval !== undefined ? <p>LINK-{card.linkval}</p> : <span />}
        {card.attribute !== undefined ? (
          <p>Attribute: {card.attribute}</p>
        ) : (
          <span />
        )}
        <div className="flex-col">
          {hasAttack ? <p>ATK: {card.atk === -1 ? ' ?' : card.atk}</p> : <></>}
          {hasDefense ? <p>DEF: {card.def === -1 ? ' ?' : card.def}</p> : <></>}
        </div>
      </div>
      <div className={'p-4 justify-items-start justify-center'}>
        <p>{card.typeline?.join('/')}</p>
        {card.desc.split(/\r\n/).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  )
}
