import { Card } from "../types/Card.ts";
import Arrow from "./Arrow.tsx";
import { POSITIONS } from "../constants/arrowPositions.ts";
import AttributeIcon from './AttributeIcon.tsx'

interface LinkCardFrameProps {
  card: Card;
  style: {
    bg: string
    title: string
    borderTopR: string
    borderTopL: string
    descBg: string
    borderDesc: string
  }
}

const LinkCardFrame = ({ card, style }: LinkCardFrameProps) => {
  return (
    <div
      className={`block border-10 rounded-lg shadow-lg ${style.bg} border-gray-600
                  w-[300px] h-[425x] flex flex-col space-y-1 p-3`}
    >
      {/* TITLE */}
      <div
        className={`flex flex-row justify-between border-2 p-1 pl-1 text-left ${style.borderTopR} ${style.borderTopL}`}
      >
        <h2 className={`text-md font-bold truncate ${style.title}`}>{card.name}</h2>
        <AttributeIcon card={card} />
      </div>

      <div className="p-2"></div>

      {/* IMG */}
      <div className="relative">
        <div className="flex justify-center items-center pr-2 pl-2 pt-0 pb-0 ">
          <img
            src={card.card_images[0].image_url_cropped}
            alt={card.name}
            className={`w-full object-contain rounded-sm border-4 border-gray-700`}
          />
        </div>
        {/* ARROWS */}
        <div className="absolute inset-0 flex items-center justify-center">
          {POSITIONS?.map((pos, idx) => {
            const isActive = card.linkmarkers?.includes(pos);
            return (
              <Arrow
                position={pos}
                isActive={Boolean(isActive)}
                key={idx}
              />
            );
          })}
        </div>
      </div>

      {/* DESC */}
      <div
        className={`flex flex-col justify-between px-1 border-2 rounded-sm overflow-hidden text-xs ${style.borderDesc} ${style.descBg} h-[90px] mt-2 text-black`}
      >
        <p className="line-clamp-3 font-semibold">
          [{card.typeline?.join('/')}]
        </p>
        <p className="line-clamp-3">{card.desc}</p>
        <div className="bottom-0 flex justify-end space-x-1 text-xs border-t-1 ">
          {card.atk !== undefined && (
            <p className="text-right text-xs font-semibold">
              ATK/ {card.atk === -1 ? ' ?' : card.atk}
            </p>
          )}
            <p className="font-extrabold pl-3 pr-2 scale-x-150">
            LINK-{card.linkval}
            </p>
      </div>
      </div>
    </div>
  );
};

export default LinkCardFrame;
