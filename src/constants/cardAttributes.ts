export const ATTRIBUTES_STYLES = [
  {
    name: "DARK",
    bg: "bg-gradient-to-b from-pink-600 to-purple-600 border-1 border-purple-500",
    symbol: "闇",
  },
  {
    name: "DIVINE",
    bg: "bg-gradient-to-b from-amber-500 to-yellow-950 border-1 border-yellow-400",
    symbol: "神",
  },
  {
    name: "EARTH",
    bg: "bg-gradient-to-b from-grey-900 to-lime-950 ",
    symbol: "地",
  },
  {
    name: "FIRE",
    bg: "bg-gradient-to-b from-red-400 to-red-600 border-1 border-red-400",
    symbol: "炎",
  },
  {
    name: "LIGHT",
    bg: "bg-gradient-to-b from-amber-500 to-yellow-950 border-1 border-yellow-400",
    symbol: "光",
  },
  {
    name: "WATER",
    bg: "bg-gradient-to-b from-blue-400 to-blue-700",
    symbol: "水",
  },
  {
    name: "WIND",
    bg: "bg-gradient-to-b from-green-500 to-green-700",
    symbol: "風",
  },
  {
    name: "TRAP",
    bg: "bg-gradient-to-b from-pink-600 to-purple-900",
    symbol: "罠",
  },
  {
    name: "SPELL",
    bg: "bg-gradient-to-b from-teal-600 to-cyan-950",
    symbol: "魔",
  },
];

export const ATTRIBUTES_SYMBOLS = ATTRIBUTES_STYLES.map((a) => a.symbol);
export const ATTRIBUTES_NAMES = ATTRIBUTES_STYLES.map((a) => a.name);
