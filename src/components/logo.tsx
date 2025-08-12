import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" prefetch={false}>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Empório Verde Grãos
      </span>
    </Link>
  );
}
