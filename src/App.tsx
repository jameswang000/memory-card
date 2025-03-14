import { useEffect, useState } from "react";
import MemoryCards from "./components/MemoryCards";
import photoData from "./utils";

const PHOTO_ENDPOINT = "https://jsonplaceholder.typicode.com/photos/1";

const NUM_PHOTOS = 12;

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
          return { src: photoJson.url, description: photoJson.title };
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
    <>
      <h1>Random Photos Memory Game</h1>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <div>
        <p>Score: {score}</p>
        <p>Best score: {bestScore}</p>
      </div>
      <MemoryCards
        photos={photos}
        score={score}
        setScore={setScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </>
  );
};

export default App;
