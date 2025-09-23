import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-black/10 dark:border-white/10 mt-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
				<div>
					<h3 className="font-semibold mb-2">Walkie Rentals</h3>
					<p className="text-black/70 dark:text-white/70">Rent cameras, lenses, and accessories with flexible dates.</p>
				</div>
				<div>
					<h4 className="font-semibold mb-2">Company</h4>
					<ul className="space-y-1">
						<li><Link href="/about" className="hover:underline">About</Link></li>
						<li><Link href="/support" className="hover:underline">Support</Link></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-2">Legal</h4>
					<ul className="space-y-1">
						<li><Link href="/terms" className="hover:underline">Terms</Link></li>
						<li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
					</ul>
				</div>
			</div>
			<div className="text-center text-xs text-black/60 dark:text-white/60 pb-8">© {new Date().getFullYear()} Walkie Rentals</div>
		</footer>
	);
}


