import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>Home page</p>
      <Link href="/other">Go to other page</Link>
      <br />
      <Link href="/action">Go to action page</Link>
    </>
  );
}
