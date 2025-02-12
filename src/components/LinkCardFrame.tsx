import { Card } from "../types/Card.ts";
import Arrow from "./Arrow.tsx";
import { POSITIONS } from "../constants/arrowPositions.ts";

interface LinkCardFrameProps {
  card: Card;
}

const LinkCardFrame = ({ card }: LinkCardFrameProps) => {
  return (
    <div className="block border-10 rounded-lg shadow-lg border-gray-600 w-[300px] h-[425px] flex-col p-3">
      {/* Imagen */}
      <div className="relative flex justify-center items-center">
        <img
          src={card.card_images[0].image_url_cropped}
          alt={card.name}
          className="w-full object-contain rounded-sm border-4 border-gray-700"
        />
        {/* Flechas Link */}
        <div className="absolute inset-0 flex items-center justify-center">
          {POSITIONS.map((pos, idx) => {
            const isActive = card.linkmarkers?.includes(pos);
            return <Arrow position={pos} isActive={Boolean(isActive)} key={idx} />;
          })}
        </div>
      </div>

      {/* Información Link */}
      <div className="p-2 border-2 rounded-sm text-xs h-[90px] mt-2 text-black">
        <p className="font-bold">LINK-{card.linkval}</p>
        {card.atk !== undefined && <p>ATK/ {card.atk}</p>}
      </div>
    </div>
  );
};

export default LinkCardFrame;
