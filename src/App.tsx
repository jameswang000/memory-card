import { useEffect, useState } from "react";
import MemoryCards from "./components/MemoryCards";
import photoData from "./utils";
import { v4 as uuidv4 } from "uuid";

const PHOTO_ENDPOINT =
  "https://via.assets.so/img.jpg?w=200&h=200&tc=black&bg=gray&t=Placeholder";

const NUM_PHOTOS = 12;
const ORIGINAL_ORDERING: number[] = [];
for (let i = 0; i < NUM_PHOTOS; i++) {
  ORIGINAL_ORDERING.push(i);
}

const UNSPLASH;

const App = () => {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [photos, setPhotos] = useState<photoData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);

        const fetchPhoto = async (url: string) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
          }
          return response.json();
        };

        const photo_urls = [];
        for (let i = 0; i < NUM_PHOTOS; i++) {
          photo_urls.push(PHOTO_ENDPOINT);
        }
        const photos = await Promise.all(
          photo_urls.map((url) => fetchPhoto(url))
        );
        const photoInfos: photoData[] = photos.map((photoJson) => {
          const id = uuidv4();
          console.log(photoJson);
          return {
            id: id,
            src: photoJson.url,
            description: photoJson.title,
          };
        });
        setPhotos(photoInfos);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };
    fetchPhotos();

    return () => {
      setError(null);
      setIsLoading(true);
    };
  }, []);

  return (
    <div className="font-sans p-2 w-full">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">Random Photos Memory Game</h1>
          <p className="mt-4 mb-4 text-xl font-bold">
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div className="m-1 text-lg">
          <p className="font-bold">Score: {score}</p>
          <p className="font-bold">Best score: {bestScore}</p>
        </div>
      </div>
      {isLoading ? (
        <div className="font-medium text-md">Loading...</div>
      ) : error == null ? (
        <MemoryCards
          photos={photos}
          setPhotos={setPhotos}
          score={score}
          setScore={setScore}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      ) : (
        <div className="text-red-600">
          {`The following error occured while setting up the game: ${error}`}
        </div>
      )}
    </div>
  );
};

export default App;
