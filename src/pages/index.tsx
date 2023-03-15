/* eslint-disable @next/next/no-img-element */
import { getVoteOptions } from "@/utils/getRandomCharacter";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

const btn =
  "bg-blue-300 hover:bg-blue-400 text-white-800 font-bold py-2 px-4 rounded m-3";

export default function Home() {
  const [vote, setVote] = useState<Array<number>>([]);

  useEffect(() => {
    const options = getVoteOptions();
    setVote(options);
  }, []);

  const firstCharacter = trpc.characterById.useQuery({ id: vote[0] });

  const secondCharacter = trpc.characterById.useQuery({ id: vote[1] });

  const voteRound = (option?: string) => {
    const options = getVoteOptions();
    setVote(options);
  };

  type Character = {
    name: string;
    image: string;
  };

  const CharacterListening: React.FC<{
    character: Character;
    vote: () => void;
  }> = (props) => {
    return (
      <div className="w-34 h-34 bg-red-200 flex flex-col items-center">
        <img src={props.character.image} alt="" className="w-34" />
        <p> {props.character.name}</p>
        <button className={btn} onClick={() => props.vote()}>
          Vote
        </button>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which character is fire ?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {firstCharacter.data && (
          <CharacterListening
            character={firstCharacter.data}
            vote={() => voteRound(firstCharacter.data.name)}
          />
        )}
        <div className="p-8">Vs</div>
        {secondCharacter.data && (
          <CharacterListening
            character={secondCharacter.data}
            vote={() => voteRound(secondCharacter.data.name)}
          />
        )}
      </div>
    </div>
  );
}
