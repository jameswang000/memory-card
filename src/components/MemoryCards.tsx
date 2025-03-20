import photoData from "../utils";
import MemoryCard from "./MemoryCard";
import _ from "lodash";
import { useState } from "react";

interface MemoryCardsProps {
  photos: photoData[];
  setPhotos: React.Dispatch<React.SetStateAction<photoData[]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  bestScore: number;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
}

const MemoryCards = ({
  photos,
  setPhotos,
  score,
  setScore,
  bestScore,
  setBestScore,
}: MemoryCardsProps) => {
  const [clickedPhotos, setClickedPhotos] = useState<string[]>([]);
  return (
    <div>
      {photos.map((photo) => {
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          if (clickedPhotos.includes(photo.id)) {
            // Photo has already been clicked mistake
            setScore(0);
            setClickedPhotos([]);
          } else {
            // Photo has not been clicked before, increase score,
            setClickedPhotos((prevClickedPhotos) => [
              ...prevClickedPhotos,
              photo.id,
            ]);
            setScore((prevScore) => prevScore + 1);
            if (score + 1 > bestScore) {
              setBestScore((prevBestScore) => prevBestScore + 1);
            }
          }
          const newPhotos = _.shuffle(photos);
          setPhotos(newPhotos);
        };
        return (
          <MemoryCard key={photo.id} photo={photo} handleClick={handleClick} />
        );
      })}
    </div>
  );
};

export default MemoryCards;
