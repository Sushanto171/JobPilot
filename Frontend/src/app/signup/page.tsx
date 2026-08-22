import { SignupPage as PublicSignupPage } from "../../components/public/SignupPage";
import { PublicFrame } from "../../components/public/shared";

export default function SignupPage() {
  return <PublicFrame page="signup"><PublicSignupPage /></PublicFrame>;
}
