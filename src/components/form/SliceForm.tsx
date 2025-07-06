import { SliceSchema } from "../../schemas/SliceSchema";
import { RecipesFields } from "./RecipesFields";
import { useAppForm } from "./form";
import { sliceFormOpts } from "./formOptions";

/**
 * SliceForm component for managing slice values.
 * @returns A form component for managing slice values.
 */
export default function SliceForm() {
	const form = useAppForm({
		...sliceFormOpts,
		validators: {
			onSubmit: SliceSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			alert(JSON.stringify(value, null, 2));
		},
	});

	return (
		<div className="w-full max-w-2xl mx-auto p-4 max-h-[80vh] overflow-y-auto">
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

				<RecipesFields form={form} />

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
