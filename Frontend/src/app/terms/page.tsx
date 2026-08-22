import { TermsPage as PublicTermsPage } from "../../components/public/LegalPages";
import { PublicFrame } from "../../components/public/shared";

export default function TermsPage() {
  return <PublicFrame page="terms"><PublicTermsPage /></PublicFrame>;
}
