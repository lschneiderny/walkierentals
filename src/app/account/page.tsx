import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account",
};

export default function AccountPage() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Your Account</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="rounded-lg border p-4">
					<h2 className="font-semibold mb-2">Reservations</h2>
					<p className="text-sm opacity-70">No reservations yet.</p>
				</div>
				<div className="rounded-lg border p-4">
					<h2 className="font-semibold mb-2">Profile</h2>
					<p className="text-sm opacity-70">Manage your information.</p>
				</div>
				<div className="rounded-lg border p-4">
					<h2 className="font-semibold mb-2">Addresses</h2>
					<p className="text-sm opacity-70">Add shipping addresses.</p>
				</div>
			</div>
		</div>
	);
}


