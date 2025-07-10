export function KremboFields({
	form,
	parentPath,
}: {
	form: any;
	parentPath: string;
}) {
	return (
		<form.AppField
			name={`${parentPath}.krembo`}
			children={(kremboField: any) => {
				const krembo = kremboField.state.value || {};
				return (
					<div className="flex flex-col gap-2 border-2 border-gray-300 p-4 rounded-md">
						<form.AppField
							name={`${parentPath}.krembo.krembo_kind`}
							children={(kindField: any) => (
								<kindField.SelectField
									label="Krembo Kind:"
									options={["vanilla", "mocha"]}
									getOptionLabel={(option: any) => option as string}
									onValueChange={(value: any) => {
										if (value === "vanilla") {
											kremboField.handleChange({
												krembo_kind: "vanilla",
												wrap: 0,
											});
										} else if (value === "mocha") {
											kremboField.handleChange({
												krembo_kind: "mocha",
												code: "",
												crackles: "",
											});
										}
									}}
								/>
							)}
						/>
						{krembo?.krembo_kind === "vanilla" && (
							<form.AppField
								name={`${parentPath}.krembo.wrap`}
								children={(wrapField: any) => (
									<wrapField.NumberField label="Wrap:" />
								)}
							/>
						)}
						{krembo?.krembo_kind === "mocha" && (
							<>
								<form.AppField
									name={`${parentPath}.krembo.code`}
									children={(codeField: any) => (
										<codeField.TextField label="Code:" />
									)}
								/>
								<form.AppField
									name={`${parentPath}.krembo.crackles`}
									children={(cracklesField: any) => (
										<cracklesField.SelectField
											label="Crackles:"
											options={["I", "N"]}
											getOptionLabel={(option: any) => option as string}
										/>
									)}
								/>
							</>
						)}
					</div>
				);
			}}
		/>
	);
}
