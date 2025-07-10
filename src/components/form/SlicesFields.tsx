import React from "react";
import { KremboFields } from "./KremboFields";

// SlicesFields expects a 'form' prop
export function SlicesFields({ form }: { form: any }) {
	return (
		<form.Field name="slices" mode="array">
			{(field: any) => <SlicesTabs field={field} form={form} />}
		</form.Field>
	);
}

function SlicesTabs({ field, form }: { field: any; form: any }) {
	const slices = Array.isArray(field.state.value) ? field.state.value : [];
	const [activeTab, setActiveTab] = React.useState("0");

	React.useEffect(() => {
		if (slices.length === 0) {
			setActiveTab("0");
		} else if (parseInt(activeTab) >= slices.length) {
			setActiveTab("0");
		}
	}, [slices.length]);

	return (
		<div>
			<div className="flex items-center max-w-full mb-2">
				<div className="flex items-center overflow-x-auto ">
					{slices.map((_: any, i: number) => (
						<button
							key={i}
							className={`px-3 py-1 rounded text-sm shadow-md mx-1 ${activeTab === i.toString() ? "bg-blue-500 text-white" : "bg-gray-200"}`}
							onClick={() => setActiveTab(i.toString())}
							type="button"
						>
							{`Slice ${i + 1}`}
						</button>
					))}
				</div>
				<button
					className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm shadow-md"
					onClick={() => {
						field.pushValue({});
						setActiveTab(slices.length.toString());
					}}
					type="button"
				>
					{slices.length === 0 ? "Add Slice" : "+"}
				</button>
			</div>
			{slices.map((_: any, i: number) => (
				<div
					key={i}
					style={{ display: activeTab === i.toString() ? "block" : "none" }}
				>
					<form.Field name={`slices[${i}]`} form={form}>
						{(subField: any) => (
							<SliceFormFields
								field={subField}
								form={form}
								index={i}
								removeSlice={() => {
									field.removeValue(i);
									setActiveTab("0");
								}}
								slicesLength={slices.length}
							/>
						)}
					</form.Field>
				</div>
			))}
		</div>
	);
}

// Placeholder for SliceFormFields, to be implemented next
function SliceFormFields({
	field,
	form,
	index,
	removeSlice,
	slicesLength,
}: any) {
	const slice = field.state.value;
	return (
		<div className="flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md mb-2">
			<div className="flex flex-row items-center justify-between">
				<button
					type="button"
					className="w-min px-4 bg-red-500 text-white rounded"
					onClick={removeSlice}
					disabled={slicesLength === 1}
					title={
						slicesLength === 1 ? "At least one slice required" : "Remove slice"
					}
				>
					-
				</button>
				<h3 className="text-xl font-semibold">Slice {index + 1}</h3>
				<div></div>
			</div>
			<form.AppField
				form={form}
				name={`slices[${index}].variation`}
				children={(variationField: any) => (
					<variationField.SelectField
						label="Variation:"
						options={["single", "multi", "cyclic"]}
						getOptionLabel={(option: any) => option as string}
					/>
				)}
			/>
			<form.AppField
				form={form}
				name={`slices[${index}].duration`}
				children={(durationField: any) => (
					<durationField.NumberField label="Duration:" />
				)}
			/>
			<form.AppField
				form={form}
				name={`slices[${index}].power`}
				children={(powerField: any) => (
					<powerField.NumberField label="Power:" />
				)}
			/>
			{/* Render techniques if variation is multi or cyclic */}
			{(slice?.variation === "multi" || slice?.variation === "cyclic") && (
				<TechniquesFields
					form={form}
					parentIndex={index}
					variation={slice.variation}
				/>
			)}
			{/* TODO: Render building block fields if variation is single */}
			{slice?.variation === "single" && (
				<>
					<form.AppField
						form={form}
						name={`slices[${index}].building_block_kind`}
						children={(kindField: any) => (
							<kindField.SelectField
								label="Building Block Kind:"
								options={[
									"cake",
									"cookie",
									"sweet",
									"pancake",
									"american_pancake",
									"biscuit",
									"brownie",
								]}
								getOptionLabel={(option: any) => option as string}
							/>
						)}
					/>
					{/* Render fields based on building_block_kind */}
					{(() => {
						const kind = slice?.building_block_kind;
						switch (kind) {
							case "cake":
								return (
									<form.AppField
										form={form}
										name={`slices[${index}].sugar`}
										children={(sugarField: any) => (
											<sugarField.NumberField label="Sugar:" />
										)}
									/>
								);
							case "cookie":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].sugar`}
											children={(sugarField: any) => (
												<sugarField.NumberField label="Sugar:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].flour`}
											children={(flourField: any) => (
												<flourField.NumberField label="Flour:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].egg_count`}
											children={(eggField: any) => (
												<eggField.NumberField label="Egg Count:" />
											)}
										/>
									</>
								);
							case "sweet":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].start_cooking`}
											children={(field: any) => (
												<field.NumberField label="Start Cooking:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].end_cooking`}
											children={(field: any) => (
												<field.NumberField label="End Cooking:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].cooking_time`}
											children={(field: any) => (
												<field.NumberField label="Cooking Time:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].temperature_gap`}
											children={(field: any) => (
												<field.NumberField label="Temperature Gap:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].cooking_dwell`}
											children={(field: any) => (
												<field.NumberField label="Cooking Dwell:" />
											)}
										/>
									</>
								);
							case "pancake":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].path`}
											children={(field: any) => (
												<field.TextField label="Path (.bin/.xdat/.xhdr):" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].sugar`}
											children={(field: any) => (
												<field.NumberField label="Sugar:" />
											)}
										/>
									</>
								);
							case "american_pancake":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].path`}
											children={(field: any) => (
												<field.TextField label="Path (.wav/.mp4):" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].sugar`}
											children={(field: any) => (
												<field.NumberField label="Sugar:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].flour`}
											children={(field: any) => (
												<field.NumberField label="Flour:" />
											)}
										/>
										{/* Krembo object */}
										<KremboFields form={form} parentPath={`slices[${index}]`} />
									</>
								);
							case "biscuit":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].sugar`}
											children={(field: any) => (
												<field.NumberField label="Sugar:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].flour`}
											children={(field: any) => (
												<field.NumberField label="Flour:" />
											)}
										/>
										<KremboFields form={form} parentPath={`slices[${index}]`} />
									</>
								);
							case "brownie":
								return (
									<>
										<form.AppField
											form={form}
											name={`slices[${index}].brownie_string`}
											children={(field: any) => (
												<field.TextField label="Brownie String (hex):" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].sugar`}
											children={(field: any) => (
												<field.NumberField label="Sugar:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].flour`}
											children={(field: any) => (
												<field.NumberField label="Flour:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].brownie_time`}
											children={(field: any) => (
												<field.NumberField label="Brownie Time:" />
											)}
										/>
										<form.AppField
											form={form}
											name={`slices[${index}].brownie_cooking_time`}
											children={(field: any) => (
												<field.NumberField label="Brownie Cooking Time:" />
											)}
										/>
										<KremboFields form={form} parentPath={`slices[${index}]`} />
									</>
								);
							default:
								return null;
						}
					})()}
				</>
			)}
		</div>
	);
}

// Placeholder for TechniquesFields, to be implemented next
function TechniquesFields({ form, parentIndex }: any) {
	return (
		<form.Field
			name={`slices[${parentIndex}].techniques`}
			mode="array"
			form={form}
		>
			{(field: any) => (
				<TechniquesTabs field={field} form={form} parentIndex={parentIndex} />
			)}
		</form.Field>
	);
}

function TechniquesTabs({ field, form }: any) {
	const techniques = Array.isArray(field.state.value) ? field.state.value : [];
	const [activeTab, setActiveTab] = React.useState("0");

	React.useEffect(() => {
		if (techniques.length === 0) {
			setActiveTab("0");
		} else if (parseInt(activeTab) >= techniques.length) {
			setActiveTab("0");
		}
	}, [techniques.length]);

	return (
		<div>
			<div className="flex items-center max-w-full mb-2">
				<div className="flex items-center overflow-x-auto ">
					{techniques.map((_: any, i: number) => (
						<button
							key={i}
							className={`px-3 py-1 rounded text-sm shadow-md mx-1 ${activeTab === i.toString() ? "bg-blue-500 text-white" : "bg-gray-200"}`}
							onClick={() => setActiveTab(i.toString())}
							type="button"
						>
							{`Technique ${i + 1}`}
						</button>
					))}
				</div>
				<button
					className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm shadow-md"
					onClick={() => {
						field.pushValue({});
						setActiveTab(techniques.length.toString());
					}}
					type="button"
				>
					{techniques.length === 0 ? "Add Technique" : "+"}
				</button>
			</div>
			{techniques.map((_: any, i: number) => (
				<div
					key={i}
					style={{ display: activeTab === i.toString() ? "block" : "none" }}
				>
					<form.Field name={`techniques[${i}]`} form={form}>
						{(subField: any) => (
							<SliceFormFields
								field={subField}
								form={form}
								index={i}
								removeSlice={() => {
									field.removeValue(i);
									setActiveTab("0");
								}}
								slicesLength={techniques.length}
							/>
						)}
					</form.Field>
				</div>
			))}
		</div>
	);
}
