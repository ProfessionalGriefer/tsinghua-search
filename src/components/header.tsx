import Image from 'next/image';

export default function Header() {
  return <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 container">
    <Image width={50} height={50} alt="Tsinghua Logo" src="/tsinghua-logo.png" />
    <div className="font-bold text-xl">
      Amazing Tsinghua Search</div>
  </header>;
}
