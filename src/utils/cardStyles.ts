export const cardStyles: Record<
  string,
  {
    bg: string;
    title: string;
    borderTopL: string;
    borderTopR: string;
    descBg: string;
    borderDesc: string;
  }
> = {
  normal: {
    bg: "bg-amber-300",
    title: "text-black",
    borderTopL: "border-l-amber-200 border-t-amber-200",
    borderTopR: "border-amber-600",
    descBg: "bg-yellow-100",
    borderDesc: "border-orange-600",
  },
  effect: {
    bg: "bg-amber-600",
    title: "text-black",
    borderTopL: "border-l-amber-200 border-t-amber-200",
    borderTopR: "border-amber-700",
    descBg: "bg-orange-100",
    borderDesc: "border-orange-600",
  },
  fusion: {
    bg: "bg-violet-500",
    title: "text-amber-400",
    borderTopL: "border-l-violet-400 border-t-violet-400",
    borderTopR: "border-violet-800",
    descBg: "bg-purple-200",
    borderDesc: "border-orange-600",
  },
  synchro: {
    bg: "bg-gray-300",
    title: "text-black",
    borderTopL: "border-l-gray-200 border-t-gray-200",
    borderTopR: "border-gray-500",
    descBg: "bg-gray-200",
    borderDesc: "border-orange-600",
  },
  xyz: {
    bg: "bg-slate-900",
    title: "text-white",
    borderTopL: "border-l-slate-300 border-t-slate-300",
    borderTopR: "border-slate-600",
    descBg: "bg-gray-300",
    borderDesc: "border-orange-600",
  },
  link: {
    bg: "bg-blue-500",
    title: "text-white",
    borderTopL: "border-l-blue-300 border-t-blue-300",
    borderTopR: "border-blue-800",
    descBg: "bg-blue-200",
    borderDesc: "border-orange-600",
  },
  spell: {
    bg: "bg-teal-600",
    title: "text-white",
    borderTopL: "border-l-teal-400 border-t-teal-400",
    borderTopR: "border-teal-800",
    descBg: "bg-teal-200",
    borderDesc: "border-orange-600",
  },
  trap: {
    bg: "bg-pink-500",
    title: "text-white",
    borderTopL: "border-l-pink-300 border-t-pink-300",
    borderTopR: "border-pink-800",
    descBg: "bg-pink-200",
    borderDesc: "border-orange-600",
  },
  effect_pendulum: {
    bg: "bg-gradient-to-b from-amber-600 to-teal-600",
    title: "text-black",
    borderTopL: "border-l-amber-200 border-t-amber-200",
    borderTopR: "border-amber-700",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  normal_pendulum: {
    bg: "bg-gradient-to-b from-amber-300 to-teal-600",
    title: "text-black",
    borderTopL: "border-l-amber-200 border-t-amber-200",
    borderTopR: "border-amber-500",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  fusion_pendulum: {
    bg: "bg-gradient-to-b from-purple-600 to-teal-600",
    title: "text-black",
    borderTopL: "border-l-violet-300 border-t-violet-300",
    borderTopR: "border-violet-700",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  ritual_pendulum: {
    bg: "bg-gradient-to-b from-blue-400 to-teal-600",
    title: "text-black",
    borderTopL: "border-l-blue-300 border-t-blue-300",
    borderTopR: "border-blue-700",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  xyz_pendulum: {
    bg: "bg-gradient-to-b from-slate-900 to-teal-600",
    title: "text-yellow-400",
    borderTopL: "border-l-slate-300 border-t-slate-300",
    borderTopR: "border-slate-600",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  synchro_pendulum: {
    bg: "bg-gradient-to-b from-gray-300 to-teal-600",
    title: "text-black",
    borderTopL: "border-l-slate-300 border-t-slate-300",
    borderTopR: "border-slate-600",
    borderDesc: "border-grey-600",
    descBg: "bg-teal-200",
  },
  ritual: {
    bg: "bg-blue-400",
    title: "text-black",
    borderTopL: "border-l-blue-300 border-t-blue-300",
    borderTopR: "border-blue-600",
    descBg: "bg-blue-200",
    borderDesc: "border-orange-600",
  },
  token: {
      bg: "bg-gray-300",
      title: "text-black",
      borderTopL: "border-gray-100",
      borderTopR: "border-gray-500",
      descBg: "bg-gray-100",
      borderDesc: "border-orange-600",
  },
  default: {
    bg: "bg-gray-500",
    title: "text-black",
    borderTopL: "border-gray-100",
    borderTopR: "border-gray-500",
    descBg: "bg-gray-300",
    borderDesc: "border-orange-600",
  },
};

export const getCardStyles = (frameType: string) => {
  return cardStyles[frameType] || cardStyles.default;
};
