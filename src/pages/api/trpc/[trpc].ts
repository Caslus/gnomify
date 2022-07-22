import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../db/client";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
	6,
);

export const appRouter = trpc.router().mutation("createSlug", {
	input: z.object({
		url: z.string().url(),
	}),
	async resolve({ input }) {
		try {
			const slug = await nanoid();
			await prisma.shortLink.create({
				data: {
					slug: slug,
					url: input.url,
				},
			});
			return slug;
		} catch (e) {
			console.log(e);
		}
	},
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
});
