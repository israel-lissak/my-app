import z from "zod/v4";

export const RecipeSchema = z.discriminatedUnion(
	"kind",
	[
		z.object({
			kind: z.literal("cake"),
			eggs_count: z.number(),
		}),
		z.object({
			kind: z.literal("pancake"),
			radius: z.number(),
			has_syrup: z.boolean(),
		}),
	],
	{
		error: () => {
			return "kind must be defined";
		},
	},
);
