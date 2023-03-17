import { z } from "zod";
import { procedure, router } from "../trpc";
import { getCharacter } from "rickmortyapi";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = router({
  characterById: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const char = await getCharacter(input.id);
      return {
        name: char.data.name,
        image: char.data.image,
      };
    }),
  updateVote: procedure
    .input(
      z.object({
        votedFor: z.string(),
        votedAgainst: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: { ...input },
      });
      return { success: true, vote: voteInDb };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
