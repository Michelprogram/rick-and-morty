import { z } from "zod";
import { procedure, router } from "../trpc";
import { getCharacter } from "rickmortyapi";

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
        character: char.data,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
