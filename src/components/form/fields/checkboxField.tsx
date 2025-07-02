import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useFieldContext } from "../formContext.tsx";

/**
 * CheckboxField component for rendering a checkbox input with label and error handling.
 * @param {string} label - The label for the checkbox field.
 * @returns A checkbox input with label and error handling.
 */
export default function CheckboxField({ label }: { label: string }) {
	const field = useFieldContext<boolean>();

	return (
		<div>
			<Label className="flex flex-row gap-2 items-center text-2xl">
				<div>{label}</div>
				<Checkbox
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked as boolean)}
					className="h-6 w-6"
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
