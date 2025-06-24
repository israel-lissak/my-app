import z from "zod/v4";
import { RecipeSchema } from "../schemas/RecipeSchema";

export const SliceSchema = z.object({
	variation: z.enum(["single", "multi", "cyclic"]),
	power: z.number(),
	duration: z.number(),
	recipes: z.array(RecipeSchema).min(1),
});
