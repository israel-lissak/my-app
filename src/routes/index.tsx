import SliceForm from "@/components/form/SliceForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<header className="flex flex-col items-center justify-center text-[calc(10px+2vmin)]">
				<p className="text-5xl font-bold">🤺Beautiful Form🤺</p>
				<div className="flex gap-4 mt-8 w-full items-center justify-center">
					{/* <UserForm /> */}
					<SliceForm />
				</div>
			</header>
		</div>
	);
}
