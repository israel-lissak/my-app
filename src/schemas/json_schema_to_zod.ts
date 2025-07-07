import * as z from "zod/v4";

// Base definitions
const variationDef = z.enum(["single", "multi", "cyclic"]);

const sugar = z.number().int().min(1000).max(6000);
const flour = z.number().int().min(0).max(164);
const eggCount = z.number().int().min(0).max(164);

const krembo = z
	.discriminatedUnion("krembo_kind", [
		z.object({
			krembo_kind: z.literal("vanilla"),
			wrap: z.number().int().min(0).max(30),
		}),
		z.object({
			krembo_kind: z.literal("mocha"),
			code: z.string().max(4),
			crackles: z.enum(["I", "N"]).default("I"),
		}),
	])
	.nullable();

// Building block definitions using union instead of discriminatedUnion
// since v4 discriminatedUnion syntax is different and may have issues
const buildingBlockDef = z.discriminatedUnion("building_block_kind", [
	z.object({
		building_block_kind: z.literal("cake"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		sugar,
	}),

	z.object({
		building_block_kind: z.literal("cookie"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		sugar,
		flour,
		egg_count: eggCount,
	}),

	z.object({
		building_block_kind: z.literal("sweet"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		start_cooking: sugar,
		end_cooking: sugar,
		cooking_time: z.number().min(40).max(3000),
		temperature_gap: flour.optional(),
		cooking_dwell: z.number().min(100).max(1500).optional(),
	}),

	z.object({
		building_block_kind: z.literal("pancake"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		path: z.string().regex(/^.*\.(bin|xdat|xhdr)$/),
		sugar,
	}),

	z.object({
		building_block_kind: z.literal("american_pancake"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		path: z.string().regex(/^.*\.(wav|mp4)$/),
		sugar,
		flour,
		krembo,
	}),

	z.object({
		building_block_kind: z.literal("biscuit"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		sugar,
		flour,
		krembo,
	}),

	z.object({
		building_block_kind: z.literal("brownie"),
		variation: z.literal(variationDef.enum.single),
		duration: z.number().nullable(),
		power: z.number().nullable(),
		brownie_string: z.string().regex(/^[0-9a-fA-F]+$/),
		sugar,
		flour,
		brownie_time: z.number(),
		brownie_cooking_time: z.number(),
		krembo,
	}),
]);

// Recursive type definitions for Zod v4
type BaseStepDef = {
	variation: "single" | "multi" | "cyclic";
	duration?: unknown;
} & (
	| ({ variation: "single" } & z.infer<typeof buildingBlockDef>)
	| { variation: "multi"; techniques: BaseStepDef[] }
	| { variation: "cyclic"; techniques: BaseStepDef[] }
);

// Create the recursive schema using v4 syntax
const baseStepDef: z.ZodType<BaseStepDef> = z.lazy(() =>
	z.union([
		// Single variation - merge with building block
		buildingBlockDef,

		// Multi variation
		z.object({
			variation: z.literal("multi"),
			duration: z.number().nullable(),
			techniques: z
				.array(
					z.union([
						buildingBlockDef,
						z.object({
							variation: z.literal(variationDef.enum.cyclic),
							duration: z.number().nullable(),
							techniques: z.array(buildingBlockDef).min(2),
						}),
					]),
				)
				.min(2),
		}),

		// Cyclic variation
		z.object({
			variation: z.literal("cyclic"),
			duration: z.number().min(100),
			techniques: z
				.array(
					z.union([
						buildingBlockDef,
						z.object({
							variation: z.literal(variationDef.enum.multi),
							duration: z.number().min(100),
							techniques: z.array(buildingBlockDef).min(2),
						}),
					]),
				)
				.min(2),
		}),
	]),
);

// Slice definition - similar to base step but with additional constraints
const sliceDef = baseStepDef.refine(
	(data) => {
		// Additional validation for slice-specific constraints
		if (data.variation === "multi" || data.variation === "cyclic") {
			// Check nesting constraints for slices
			if ("techniques" in data) {
				return data.techniques.every((technique) => {
					if (
						technique.variation === "multi" ||
						technique.variation === "cyclic"
					) {
						if ("techniques" in technique) {
							return technique.techniques.every(
								(innerTech) => innerTech.variation === "single",
							);
						}
					}
					return true;
				});
			}
		}
		return true;
	},
	{
		message: "Slice techniques cannot have more than 2 levels of nesting",
	},
);

// Main schema
const mainSchema = z
	.object({
		$schema: z.unknown().optional(),
		slices: z.array(sliceDef).optional(),
	})
	.refine(
		(data) => {
			// If there are at least 2 slices, they must have duration defined
			if (data.slices && data.slices.length >= 2) {
				return data.slices.every(
					(slice) =>
						typeof slice.duration === "number" &&
						slice.duration >= 40e-6 &&
						slice.duration <= 3e3,
				);
			}
			// If there's only one slice or no slices, duration should be null
			if (data.slices && data.slices.length === 1) {
				return data.slices[0].duration === null;
			}
			return true;
		},
		{
			message:
				"Duration constraints: multiple slices must have numeric duration (40e-6 to 3e3), single slice must have null duration",
		},
	);

// Export the schema
export default mainSchema;

// Type inference
export type MainSchemaType = z.infer<typeof mainSchema>;
export type SliceType = z.infer<typeof sliceDef>;
export type BuildingBlockType = z.infer<typeof buildingBlockDef>;
export type KremboType = z.infer<typeof krembo>;

const example: MainSchemaType = {
	slices: [
		{
			variation: "single",
			duration: 4.5,
			power: null,
			building_block_kind: "biscuit",
			flour: 100,
			sugar: 1000,
			krembo: {
				krembo_kind: "vanilla",
				wrap: 10,
			},
		},
		{
			variation: "multi",
			duration: 444,
			techniques: [
				{
					variation: "single",
					duration: null,
					power: null,
					building_block_kind: "cookie",
					egg_count: 12,
					flour: 100,
					sugar: 1000,
				},
				{
					variation: "cyclic",
					duration: null,
					techniques: [
						{
							duration: 100,
							variation: "single",
							power: null,
							building_block_kind: "cake",
							sugar: 1000,
						},
						{
							duration: 100,
							variation: "single",
							power: null,
							building_block_kind: "pancake",
							path: "meow.bin",
							sugar: 1000,
						},
					],
				},
			],
		},
	],
};

console.log(mainSchema.parse(example));
