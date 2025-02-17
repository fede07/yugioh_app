import { Card } from '../types/Card.ts'
import CardFrame from './CardFrame.tsx'
import { CardInfo } from './CardInfo.tsx'

interface ListViewProps {
  cards: Card[]
}

export const ListView = ({ cards }: ListViewProps) => {
  return (
    <div className="space-y-6 px-4 md:px-12 lg:px-24">
      {cards.map((card) => (
        <div
          key={card.id}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-indigo-900 shadow-lg border border-gray-300 rounded-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl p-4"
        >
          <div className="flex justify-center">
            <CardFrame card={card} to={`/card/${card.id}`}/>
          </div>

          <div className="text-gray-900 font-mono text-center px-4 py-6 sm:py-8">
            <CardInfo card={card} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListView
