import { getVoteOptions } from "@/utils/getRandomCharacter";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

export default function Home() {
  const [vote, setVote] = useState<Array<number>>([]);

  useEffect(() => {
    const options = getVoteOptions();
    setVote(options);
  }, []);

  const firstCharacter = trpc.characterById.useQuery({ id: vote[0] });
  const secondCharacter = trpc.characterById.useQuery({ id: vote[1] });

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which character is fire ?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 bg-red-200 flex flex-col items-center">
          <img src={firstCharacter.data?.character.image} />
          <p> {firstCharacter.data?.character.name}</p>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 bg-blue-200 flex flex-col items-center">
          <img src={secondCharacter.data?.character.image} />
          <p> {secondCharacter.data?.character.name}</p>
        </div>
      </div>
    </div>
  );
}
