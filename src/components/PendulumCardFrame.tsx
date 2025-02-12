import { Card } from "../types/Card.ts";

interface PendulumCardFrameProps {
  card: Card;
}

const PendulumCardFrame = ({ card }: PendulumCardFrameProps) => {
  return (
    <div className="block border-10 rounded-lg shadow-lg bg-teal-200 border-gray-600 w-[300px] h-[425px] flex-col p-3">
      {/* Imagen */}
      <div className="flex justify-center items-center">
        <img
          src={card.card_images[0].image_url_cropped}
          alt={card.name}
          className="w-full object-contain rounded-sm border-4 border-gray-700"
        />
      </div>

      {/* Descripción Péndulo */}
      <div className="absolute bottom-0 grid-rows-2 space-y-0 bg-teal-200 border-3 border-gray-700 text-black">
        <div className="flex flex-row rounded-sm text-xs overflow-hidden">
          {/* Izquierda */}
          <div className="flex flex-col px-2 py-1 border-r-3 border-gray-700 font-extrabold">
            <p className="text-xl text-blue-500 arrow-diamond">←</p>
            <p className="text-black text-center">{card.scale}</p>
          </div>

          {/* Descripción */}
          <div className="p-2">
            <p className="line-clamp-3">{card.pend_desc}</p>
          </div>

          {/* Derecha */}
          <div className="flex flex-col px-2 py-1 border-l-3 border-gray-700 font-extrabold">
            <p className="text-xl text-red-500">→</p>
            <p className="text-black text-center">{card.scale}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumCardFrame;
