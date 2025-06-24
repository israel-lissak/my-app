import { SliceSchema } from "@/schemas/SliceSchema";
import { cakeRecipeExample, pancakeRecipeExample } from "./RecipeValuesType";
import z from "zod/v4";

export type SliceValuesType = z.infer<typeof SliceSchema>;

const exampleSlice: SliceValuesType = {
    duration: 30,
    power: 5,
    variation: "single",
    recipes: [
        cakeRecipeExample,
        pancakeRecipeExample
    ],
};

const exampleSliceMulti: SliceValuesType = {
    duration: 45,
    power: 7,
    variation: "multi",
    recipes: [
        cakeRecipeExample,
        pancakeRecipeExample
    ],
};

const exampleSliceCyclic: SliceValuesType = {
    duration: 60,
    power: 10,
    variation: "cyclic",
    recipes: [
        cakeRecipeExample,
        pancakeRecipeExample
    ],
};