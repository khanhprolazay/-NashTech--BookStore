import { useRouter } from "next/router";

export default function Book() {
  const router = useRouter();
  const slug = router.query.slug as string;

  return <div>Book</div>;
}