import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { withForm } from "./form";
import { sliceFormOpts } from "./formOptions";

function RecipesTabs({ field, form }: { field: any; form: any }) {
	const recipes = Array.isArray(field.state.value) ? field.state.value : [];
	const [activeTab, setActiveTab] = React.useState("0");

	React.useEffect(() => {
		if (recipes.length === 0) {
			setActiveTab("0");
		} else if (parseInt(activeTab) >= recipes.length) {
			setActiveTab("0");
		}
	}, [recipes.length]);

	return (
		<div>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					{recipes.map((_: any, i: number) => (
						<TabsTrigger key={i} value={i.toString()}>
							{`Recipe ${i + 1}`}
						</TabsTrigger>
					))}
				</TabsList>
				{recipes.map((_: any, i: number) => (
					<TabsContent key={i} value={i.toString()}>
						<form.Field name={`recipes[${i}]`} form={form}>
							{(subField: any) => {
								const recipe = subField.state.value as any;
								return (
									<div className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md mb-2">
										<div className="flex flex-row items-center justify-between">
											<button
												type="button"
												className="w-min px-4 bg-red-500 text-white rounded"
												onClick={() => {
													field.removeValue(i);
													setActiveTab("0");
												}}
												disabled={recipes.length === 1}
												title={
													recipes.length === 1
														? "At least one recipe required"
														: "Remove recipe"
												}
											>
												-
											</button>
											<h3 className="text-xl font-semibold">Recipe {i + 1}</h3>
											<div></div>
										</div>

										<form.AppField
											form={form}
											name={`recipes[${i}].kind`}
											children={(field: any) => (
												<field.SelectField
													label="Kind:"
													options={["cake", "pancake"]}
													getOptionLabel={(option: any) => option as string}
													onValueChange={(value: any) => {
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

										{recipe?.kind === "cake" && (
											<form.AppField
												form={form}
												name={`recipes[${i}].eggs_count`}
												children={(field: any) => (
													<field.NumberField label="Eggs Count:" />
												)}
											/>
										)}

										{recipe?.kind === "pancake" && (
											<>
												<form.AppField
													form={form}
													name={`recipes[${i}].radius`}
													children={(field: any) => (
														<field.NumberField label="Radius:" />
													)}
												/>

												<form.AppField
													form={form}
													name={`recipes[${i}].has_syrup`}
													children={(field: any) => (
														<field.CheckboxField label="Has Syrup?" />
													)}
												/>
											</>
										)}
									</div>
								);
							}}
						</form.Field>
					</TabsContent>
				))}
			</Tabs>
			<button
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
				onClick={() => {
					field.pushValue({});
					setActiveTab(recipes.length.toString());
				}}
				type="button"
			>
				Add Recipe
			</button>
		</div>
	);
}

export const RecipesFields = withForm({
	...sliceFormOpts,
	render: ({ form }) => {
		return (
			<form.Field name="recipes" mode="array">
				{(field: any) => <RecipesTabs field={field} form={form} />}
			</form.Field>
		);
	},
});
