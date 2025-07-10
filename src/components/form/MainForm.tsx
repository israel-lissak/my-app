import { z } from "zod";
import mainSchema, {
	type MainSchemaType,
} from "../../schemas/json_schema_to_zod";
import { useAppForm } from "./form";
import { mainFormOpts } from "./formOptions";
import { SlicesFields } from "./SlicesFields";

export default function MainForm() {
	const form = useAppForm({
		...mainFormOpts,
		validators: {
			onSubmit: mainSchema as unknown as z.ZodType<MainSchemaType>,
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
				{/* $schema field is optional and hidden from user */}
				<SlicesFields form={form} />
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
