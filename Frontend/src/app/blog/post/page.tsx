import { BlogPostPage as PublicBlogPostPage } from "../../../components/public/BlogPostPage";
import { PublicFrame } from "../../../components/public/shared";

export default function BlogPostPage() {
  return <PublicFrame page="post"><PublicBlogPostPage /></PublicFrame>;
}
