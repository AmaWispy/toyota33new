import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

function copyrightYears(startYear = 2016) {
    const currentYear = new Date().getFullYear();
    return currentYear > startYear ? `${startYear}–${currentYear}` : String(startYear);
}

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Админка — Тойота33" />

            <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#030303] text-white">
                {/* Red diagonal accents */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -left-24 top-0 h-full w-[42%] -skew-x-12 bg-[#E4032E]/90"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-[8%] top-0 h-full w-3 -skew-x-12 bg-[#E4032E]"
                />

                <header className="relative z-10 flex items-center justify-end px-6 py-6 sm:px-10">
                    <a
                        href="https://toyota33.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/60 transition hover:text-white"
                    >
                        Сайт →
                    </a>
                </header>

                <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#E4032E]">
                        Панель управления
                    </p>
                    <ApplicationLogo className="h-8 w-auto text-white sm:h-11" />

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-[2px] bg-[#E4032E] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E4032E]/90"
                            >
                                Открыть панель
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="rounded-[2px] bg-[#E4032E] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#E4032E]/90"
                            >
                                Войти
                            </Link>
                        )}
                    </div>
                </main>

                <footer className="relative z-10 px-6 py-6 text-center text-xs text-white/40 sm:px-10">
                    © {copyrightYears()} Тойота33 · toyota33.com
                </footer>
            </div>
        </>
    );
}
