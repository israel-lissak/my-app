import { formOptions } from "@tanstack/react-form";
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
