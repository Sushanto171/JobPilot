import { HomePage as PublicHomePage } from "../components/public/HomePage";
import { PublicFrame } from "../components/public/shared";

export default function Home() {
  return <PublicFrame page="home"><PublicHomePage /></PublicFrame>;
}
