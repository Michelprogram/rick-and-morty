import type { GetServerSideProps } from "next";
import prisma from "@/backend/utils/prisma";
import type { AsyncReturnType } from "../utils/ts-bs";
import Image from "next/image";

const ResultsPage: React.FC<{
  character: AsyncReturnType<typeof getCharacters>;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl p-4">Results</h1>
      <div className="flex flex-col w-full max-w-2xl border">
        {props.character.map((character, index) => {
          return <CharacterListening character={character} key={index} />;
        })}
      </div>
    </div>
  );
};

type Character = {
  id: number;
  name: string;
  spriteURL: string;
  _count: {
    votesFor: number;
    votesAgainst: number;
  };
};

const getCharacters = async (): Promise<Character[]> => {
  return await prisma.character.findMany({
    orderBy: {
      votesFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      spriteURL: true,
      _count: {
        select: {
          votesFor: true,
          votesAgainst: true,
        },
      },
    },
  });
};

export const getStaticProps: GetServerSideProps = async () => {
  const data = await getCharacters();
  return {
    props: {
      character: data,
    },
  };
};

type CharacterQueryResults = AsyncReturnType<typeof getCharacters>;

const generateCountPercent = (character: CharacterQueryResults[number]) => {
  const { votesFor, votesAgainst } = character._count;
  if (votesFor === 0 && votesAgainst === 0) return 0;
  return (votesFor / (votesFor + votesAgainst)) * 100;
};

const CharacterListening: React.FC<{
  character: CharacterQueryResults[number];
}> = (props) => {
  const size = 128;
  return (
    <div className="flex flex-col border-b p-2 items-center">
      <div className="flex">
        <Image
          src={props.character.spriteURL}
          width={size}
          height={size}
          alt="Character Sprite"
        />
        <div className="capitalize">{props.character.name}</div>
      </div>
      <div>{generateCountPercent(props.character)}</div>
    </div>
  );
};

export default ResultsPage;
