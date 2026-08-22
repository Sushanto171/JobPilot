import { BlogPage as PublicBlogPage } from "../../components/public/BlogPage";
import { PublicFrame } from "../../components/public/shared";

export default function BlogPage() {
  return <PublicFrame page="blog"><PublicBlogPage /></PublicFrame>;
}
