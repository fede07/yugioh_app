export const cardStyles: Record<string ,{ bg: string;title: string;border: string;descBg: string }> = {
  "Normal Monster": {
    bg: "bg-yellow-400" ,
    title: "text-black" ,
    border: "border-yellow-700" ,
    descBg: "bg-yellow-100"
  } ,
  "Effect Monster": {
    bg: "bg-orange-400" ,
    title: "text-black" ,
    border: "border-orange-700" ,
    descBg: "bg-orange-100"
  } ,
  "Fusion Monster": {
    bg: "bg-purple-600" ,
    title: "text-white" ,
    border: "border-purple-800" ,
    descBg: "bg-purple-200"
  } ,
  "Synchro Monster": {
    bg: "bg-gray-300" ,
    title: "text-black" ,
    border: "border-gray-500" ,
    descBg: "bg-gray-200"
  } ,
  "XYZ Monster": {
    bg: "bg-black" ,
    title: "text-yellow-400" ,
    border: "border-yellow-600" ,
    descBg: "bg-gray-800"
  } ,
  "Link Monster": {
    bg: "bg-blue-500" ,
    title: "text-white" ,
    border: "border-blue-800" ,
    descBg: "bg-blue-200"
  } ,
  "Spell Card": {
    bg: "bg-teal-600" ,
    title: "text-white" ,
    border: "border-teal-800" ,
    descBg: "bg-teal-200"
  } ,
  "Trap Card": {
    bg: "bg-pink-600" ,
    title: "text-white" ,
    border: "border-pink-800" ,
    descBg: "bg-pink-200"
  } ,
  default: {
    bg: "bg-gray-200" ,
    title: "text-black" ,
    border: "border-gray-500" ,
    descBg: "bg-gray-300"
  }
}

export const getCardStyles = (type: string) => {
  return cardStyles[type] || cardStyles.default
}
