import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <p className="text-2xl text-secondary mt-4">
                    Oops! Halaman yang kamu cari tidak ditemukan.
                </p>
                <Link href="/" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover active:bg-primary-active transition-button shadow-button">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
