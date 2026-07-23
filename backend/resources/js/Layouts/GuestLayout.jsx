import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#030303] px-4 py-10">
            <div className="mb-8">
                <Link href="/">
                    <ApplicationLogo className="h-8 w-auto text-white" />
                </Link>
            </div>

            <div className="w-full max-w-md overflow-hidden rounded-[2px] border border-[#1b1b1b] bg-[#111] px-6 py-6 shadow-lg">
                {children}
            </div>
        </div>
    );
}
