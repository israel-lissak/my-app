import MainForm from "@/components/form/MainForm";
import SliceForm from "@/components/form/SliceForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<header className="flex flex-col items-center justify-center text-[calc(10px+2vmin)]">
				<p className="text-4xl font-bold mt-8">🤺Beautiful Form🤺</p>
				<div className="flex flex-col gap-4 mt-4 w-full items-center justify-center">
					{/* <UserForm /> */}
					<MainForm />
					<SliceForm />
				</div>
			</header>
		</div>
	);
}
