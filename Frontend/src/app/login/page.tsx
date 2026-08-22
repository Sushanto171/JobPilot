import { LoginPage as PublicLoginPage } from "../../components/public/LoginPage";
import { PublicFrame } from "../../components/public/shared";

export default function LoginPage() {
  return <PublicFrame page="login"><PublicLoginPage /></PublicFrame>;
}
