import CardFrame from './CardFrame.tsx'
import { Card } from '../types/Card.ts'

interface gridViewProps {
  cards: Card[]
}

export const GridView = ({ cards }: gridViewProps) => {
  return (
    <div className="grid gap-2 mb-4 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen">
      {cards.map((card) => (
        <CardFrame key={card.id} card={card} />
      ))}
    </div>
  )
}

export default GridView
