export const cardStyles: Record<string ,{ bg: string;title: string;borderTop: string;descBg: string; borderDesc: string }> = {
  "Normal Monster": {
    bg: "bg-amber-300" ,
    title: "text-black" ,
    borderTop: "border-yellow-700" ,
    descBg: "bg-yellow-100",
    borderDesc: "border-orange-600"
  },
  "Effect Monster": {
    bg: "bg-orange-400" ,
    title: "text-black" ,
    borderTop: "border-orange-500" ,
    descBg: "bg-orange-100",
    borderDesc: "border-orange-600"
  },
  "Fusion Monster": {
    bg: "bg-violet-500" ,
    title: "text-white" ,
    borderTop: "border-purple-800" ,
    descBg: "bg-purple-200",
    borderDesc: "border-orange-600"
  },
  "Synchro Monster": {
    bg: "bg-gray-300" ,
    title: "text-black" ,
    borderTop: "border-gray-500" ,
    descBg: "bg-gray-200",
    borderDesc: "border-orange-600"
  },
  "XYZ Monster": {
    bg: "bg-slate-900" ,
    title: "text-yellow-400" ,
    borderTop: "border-slate-600" ,
    descBg: "bg-gray-300",
    borderDesc: "border-orange-600"
  },
  "Link Monster": {
    bg: "bg-blue-500" ,
    title: "text-white" ,
    borderTop: "border-blue-800" ,
    descBg: "bg-blue-200",
    borderDesc: "border-orange-600"
  },
  "Spell Card": {
    bg: "bg-teal-600" ,
    title: "text-white" ,
    borderTop: "border-teal-800" ,
    descBg: "bg-teal-200",
    borderDesc: "border-orange-600"
  },
  "Trap Card": {
    bg: "bg-pink-500" ,
    title: "text-white" ,
    borderTop: "border-pink-800" ,
    descBg: "bg-pink-200",
    borderDesc: "border-orange-600"
  },
  "Pendulum Effect Monster": {
    bg: "bg-gradient-to-b from-orange-400 to-teal-600",
    title: "text-black",
    borderTop: "border-orange-700",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  default: {
    bg: "bg-gray-200" ,
    title: "text-black" ,
    borderTop: "border-gray-500" ,
    descBg: "bg-gray-300",
    borderDesc: "border-orange-600"
  }
}

cardStyles["Flip Effect Monster"] = cardStyles["Effect Monster"]
cardStyles["Toon Effect Monster"] = cardStyles["Effect Monster"]

export const getCardStyles = (type: string) => {
  return cardStyles[type] || cardStyles.default
}
