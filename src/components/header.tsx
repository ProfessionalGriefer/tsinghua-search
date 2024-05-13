import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="opacity-100 z-100 bg-opacity-100 top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 container bg-background ">

      <Image width={50} height={50} alt="Tsinghua Logo" src="/tsinghua-logo.webp" />
      <Link href="/" className="font-bold text-xl opacity-100 bg-background">
        Amazing Tsinghua Search
      </Link>

      <Link href="/about" className="">About</Link>
    </header >
  );
}
