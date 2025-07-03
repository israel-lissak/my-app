import { SliceSchema } from "../../schemas/SliceSchema";
import { type SliceValuesType } from "../../types/SliceValuesType";
import { useAppForm } from "./form";

const defaultValues: SliceValuesType = {
	duration: 0,
	power: 0,
	recipes: [],
};

/**
 * SliceForm component for managing slice values.
 * @returns A form component for managing slice values.
 */
export default function SliceForm() {
	const form = useAppForm({
		defaultValues: defaultValues,
		validators: {
			onSubmit: SliceSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			alert(JSON.stringify(value, null, 2));
		},
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md"
			>
				<form.AppField
					name="duration"
					validators={{
						onBlur: SliceSchema.shape.duration,
						onChange: SliceSchema.shape.duration,
					}}
					children={(field) => <field.NumberField label="Duration:" />}
				/>

				<form.AppField
					name="power"
					validators={{
						onBlur: SliceSchema.shape.power,
						onChange: SliceSchema.shape.power,
					}}
					children={(field) => <field.NumberField label="Power:" />}
				/>

				<form.AppField
					name="variation"
					validators={{
						onBlur: SliceSchema.shape.variation,
						onChange: SliceSchema.shape.variation,
					}}
					children={(field) => (
						<field.SelectField
							label="Variation:"
							options={["single", "multi", "cyclic"]}
							getOptionLabel={(option) => option as string}
						/>
					)}
				/>

				<form.Field name="recipes" mode="array">
					{(field) => {
						return (
							<div>
								{field.state.value.map((_, i) => {
									return (
										<form.Field key={i} name={`recipes[${i}]`}>
											{(subField) => {
												return (
													<div className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md mb-2">
														<div className="flex flex-row items-center justify-between">
															<button
																type="button"
																className="w-min px-4 bg-red-500 text-white rounded"
																onClick={() => field.removeValue(i)}
																disabled={field.state.value.length === 1}
																title={
																	field.state.value.length === 1
																		? "At least one recipe required"
																		: "Remove recipe"
																}
															>
																-
															</button>
															<h3 className="text-xl font-semibold">
																Recipe {i + 1}
															</h3>
															<div></div>
														</div>

														<form.AppField
															name={`recipes[${i}].kind`}
															children={(field) => (
																<field.SelectField
																	label="Kind:"
																	options={["cake", "pancake"]}
																	getOptionLabel={(option) => option as string}
																	onValueChange={(value) => {
																		if (value === "cake") {
																			subField.handleChange({
																				kind: "cake",
																				eggs_count: 0,
																			});
																		} else if (value === "pancake") {
																			subField.handleChange({
																				kind: "pancake",
																				radius: 0,
																				has_syrup: false,
																			});
																		}
																	}}
																/>
															)}
														/>

														{subField.state.value.kind === "cake" && (
															<form.AppField
																name={`recipes[${i}].eggs_count`}
																children={(field) => (
																	<field.NumberField label="Eggs Count:" />
																)}
															/>
														)}

														{subField.state.value.kind === "pancake" && (
															<>
																<form.AppField
																	name={`recipes[${i}].radius`}
																	children={(field) => (
																		<field.NumberField label="Radius:" />
																	)}
																/>

																<form.AppField
																	name={`recipes[${i}].has_syrup`}
																	children={(field) => (
																		<field.CheckboxField label="Has Syrup?" />
																	)}
																/>
															</>
														)}
													</div>
												);
											}}
										</form.Field>
									);
								})}
								<button
									className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
									onClick={() => field.pushValue({})}
									type="button"
								>
									Add Recipe
								</button>
							</div>
						);
					}}
				</form.Field>

				<form.AppForm>
					<form.SubscribeButton label="Submit" />
				</form.AppForm>

				<button
					onClick={(e) => {
						(e.preventDefault,
							e.stopPropagation,
							alert(JSON.stringify(form.state.values, null, 2)));
					}}
					type="button"
					className="bg-green-300 text-white p-2 rounded-md"
				>
					Log
				</button>
			</form>
		</div>
	);
}
