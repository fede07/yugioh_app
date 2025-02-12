import { ATTRIBUTES_STYLES } from '../constants/cardAttributes.ts'
import { Card } from '../types/Card.ts'

interface AttributeIconProps {
  card: Card;
}

const AttributeIcon = ({ card }: AttributeIconProps) => {

  let attributeData = ATTRIBUTES_STYLES.find(
    (atr) => atr.name === card.attribute,
  );
  if (!attributeData) {
    if (card.type.includes('Spell')) {
      attributeData = ATTRIBUTES_STYLES.find((atr) => atr.name === "SPELL");
    } else if (card.type.includes('Trap')) {
      attributeData = ATTRIBUTES_STYLES.find((atr) => atr.name === "TRAP");
    } else {
      attributeData = { name: "", bg: "", symbol: "" };
    }
  }

  return (
    <div className={`text-white text-md px-1 rounded-full h-[28px] w-[28px] ${attributeData?.bg}`}>
      <span className="text-white text-xl">{attributeData?.symbol}</span>
    </div>
  )
}

export default AttributeIcon
