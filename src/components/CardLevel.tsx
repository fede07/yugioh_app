interface CardLevelProps {
  level: number
  type: string
}

export const CardLevel = ({ level, type }: CardLevelProps) => {
  const isXyz = type.includes('XYZ')

  return (
    <span>
      {(isXyz)? (
        <div className="flex justify-items-start pr-4 text-yellow-500 font-sans">
          {Array.from({ length: level || 0 }, (_, i) => (
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
        ) : (
        <div className="flex justify-end pr-4 text-yellow-500">
          {Array.from({ length: level || 0 }, (_, i) => (
            <span
              key={i}
              className={
                'bg-gradient-to-br from-orange-500 to-red-700 rounded-full w-4 h-4 flex items-center justify-center font-bold text-md'
              }
            >
            ★
          </span>
          ))}
        </div>
      )}
    </span>
  )
}

export default CardLevel
