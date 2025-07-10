import { formOptions } from "@tanstack/react-form";
import { type MainSchemaType } from "../../schemas/json_schema_to_zod";
import { type SliceValuesType } from "../../types/SliceValuesType";

//@ts-expect-error variation is required but were not initializing it
const defaultValues: SliceValuesType = {
	duration: 0,
	power: 0,
	recipes: [],
};

export const sliceFormOpts = formOptions({
	defaultValues: defaultValues,
});

const defaultValuesMain: MainSchemaType = {
	slices: [
		{
			variation: "single",
			duration: 4.5,
			power: null,
			building_block_kind: "biscuit",
			flour: 100,
			sugar: 1000,
			krembo: {
				krembo_kind: "vanilla",
				wrap: 10,
			},
		},
	],
};

export const mainFormOpts = formOptions({
	defaultValues: defaultValuesMain,
});
