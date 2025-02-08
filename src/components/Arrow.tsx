import {FC} from "react"

interface ArrowProps {
  position: string
  isActive: boolean
}

const Arrow: FC<ArrowProps> = ({position, isActive}) => {
  const arrowStyles: Record<string ,string> = {
    "Top": "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "Top-Right": "top-0 right-0 -translate-y-1/2",
    "Right": "top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2",
    "Bottom-Right": "bottom-0 right-0 translate-y-1/2",
    "Bottom": "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2",
    "Bottom-Left": "bottom-0 left-0 translate-y-1/2",
    "Left": "top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2",
    "Top-Left": "top-0 left-0 -translate-y-1/2",
  }

  const arrowRotations: Record<string, string> = {
    "Top":          "rotate-0",
    "Top-Right":    "rotate-45",
    "Right":        "rotate-90",
    "Bottom-Right": "rotate-135",
    "Bottom":       "rotate-180",
    "Bottom-Left":  "rotate-225",
    "Left":         "rotate-270",
    "Top-Left":     "rotate-315",
  }

  return (
    <div
      className={`
        absolute
        ${arrowStyles[position] || ""}
        ${isActive ? "text-red-500" : "text-gray-900"}
      `}
    >
      <span
        className={`
          absolute
          ${isActive ? "text-gray-200" : "text-gray-600"}
          text-4xl
          -top-[4px] -left-[4px] 
          font-bold
          ${arrowRotations[position] || ""}
          block 
          transition-transform
          scale-x-150
          scale-y-75
        `}
      >▲</span>

      <span
        className={`
          text-2xl
          font-bold
          ${arrowRotations[position] || ""}
          block 
          transition-transform
          scale-x-150
          scale-y-75
        `}
      >▲</span>

    </div>

  )
}

export default Arrow
