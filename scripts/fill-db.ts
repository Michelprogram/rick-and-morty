import { getCharacters } from "rickmortyapi";
import { prisma } from "../src/backend/utils/prisma";

const fillDB = async () => {
  const characters = await getCharacters();

  console.log(characters.data.results?.length);

  if (characters.data.results) {
    const formatedCharacters = characters.data.results.map((character) => ({
      name: character.name,
      spriteURL: character.image,
    }));

    const creation = await prisma.character.createMany({
      data: formatedCharacters,
    });

    console.log(creation);
  }
};

fillDB();
