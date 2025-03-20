import photoData from "../utils";

interface MemoryCardProps {
  photo: photoData;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MemoryCard = ({ photo, handleClick }: MemoryCardProps) => {
  return (
    <div
      className="border border-black hover:opacity-60 hover:cursor-pointer"
      onClick={handleClick}
    >
      <img src={photo.src} alt={photo.description} />
      <p>{photo.description}</p>
    </div>
  );
};

export default MemoryCard;
