import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import { useFieldContext } from "../formContext.tsx";

/**
 * SelectField component for rendering a select input with options.
 * @param {string} label - The label for the select field.
 * @param {T[]} options - The options to display in the select dropdown.
 * @param {(option: T) => string} getOptionLabel - Function to get the label for each option.
 * @param onValueChange - Callback function to handle value changes.
 * @returns A select input with options and error handling.
 */
export default function SelectField<T>({
	label,
	options,
	getOptionLabel,
	onValueChange,
}: {
	label: string;
	options: T[];
	getOptionLabel: (option: T) => string;
	onValueChange?: (value: T) => void;
}) {
	const field = useFieldContext<T>();

	return (
		<div>
			<Label className="flex flex-row gap-2 items-center w-full text-2xl">
				<div>{label}</div>

				<Select
					onValueChange={(value) => {
						const selected = options.find((option) => String(option) === value);
						field.handleChange(selected as T);
						if (onValueChange) {
							onValueChange(selected as T);
						}
					}}
				>
					<SelectTrigger className="border-2 border-gray-300 rounded-md p-2 flex-1">
						<SelectValue
							placeholder={
								field.state.value
									? String(field.state.value)
									: "Select an option"
							}
						/>
					</SelectTrigger>
					<SelectContent>
						{options.map((option, idx) => (
							<SelectItem key={idx} value={String(option)}>
								{getOptionLabel(option)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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
