import photoData from "../utils";

interface MemoryCardProps {
  photo: photoData;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MemoryCard = ({ photo, handleClick }: MemoryCardProps) => {
  return (
    <div onClick={handleClick}>
      <img src={photo.src} alt={photo.description} />
      <p>{photo.description}</p>
    </div>
  );
};

export default MemoryCard;
