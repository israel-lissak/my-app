import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useFieldContext } from "../formContext.tsx";

/**
 * TextField component for rendering a text input with label and error handling.
 * @param {string} label - The label for the text field.
 * @returns A text input with label and error handling.
 */
export default function TextField({ label }: { label: string }) {
	const field = useFieldContext<string>();

	return (
		<div>
			<Label className="flex flex-row gap-2 items-center text-2xl">
				<div>{label}</div>

				<Input
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					className="text-xs"
				/>
			</Label>

			{field.state.meta.errors.length > 0 && (
				<em className="text-red-500 text-sm mt-1">
					{field.state.meta.errors
						.map((err: any) => (typeof err === "string" ? err : err.message))
						.join(", ")}
				</em>
			)}
		</div>
	);
}
