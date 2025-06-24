import z from "zod/v4";
import { RecipeSchema } from "@/schemas/RecipeSchema";

export type RecipeValuesType = z.infer<typeof RecipeSchema>;

export const cakeRecipeExample: RecipeValuesType = {
    kind: "cake",
    eggs_count: 3,
}

export const pancakeRecipeExample: RecipeValuesType = {
    kind: "pancake",
    has_syrup: true,
    radius: 5,
};