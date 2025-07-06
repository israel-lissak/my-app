import z from "zod/v4";
import { RecipeSchema } from "../schemas/RecipeSchema";

export const SliceSchema = z.object({
	variation: z
		.enum(["single", "multi", "cyclic"])
		.describe("Variation of the slice, can be single, multi or cyclic"),
	power: z
		.number()
		.min(-15, "Power must be between -15 and 15")
		.max(15, "Power must be between -15 and 15"),
	duration: z.number().min(0, "Duration must be a positive number"),
	recipes: z.array(RecipeSchema).min(1),
});
