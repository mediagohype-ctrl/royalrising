import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Royal Rising",
  description: "Terms for using the Royal Rising website, viewing project materials and making service enquiries.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections: LegalSection[] = [
  { id: "overview", title: "Using this website", content: <p>These terms apply to your use of the Royal Rising website. By using the website, you agree to these terms. If you do not agree, please discontinue use. The website introduces our architecture, interior and construction services and provides a way to make enquiries.</p> },
  { id: "content", title: "Project information and imagery", content: <p>Project photographs, drawings, visualisations and descriptions are presented for general information and inspiration. Some materials may show concepts or illustrative designs. They are not construction documents, technical advice, an offer for sale or a guarantee of a particular project outcome. Site conditions, materials, approvals and agreed specifications affect each project.</p> },
  { id: "services", title: "Enquiries and service agreements", content: <><p>Sending an enquiry does not create a client relationship, confirm a booking or commit either party to a project. Services begin only under a separately agreed scope and engagement.</p><p>Fees, deliverables, schedules, payment terms, revisions, cancellation arrangements and each party’s responsibilities are defined in the applicable project agreement. That agreement governs the services if it differs from these website terms.</p></> },
  { id: "ownership", title: "Ownership and permitted use", content: <p>The website’s branding, text, photographs, drawings and other materials belong to Royal Rising or their respective owners. You may view them for personal reference. Unless permitted by law or authorised by the rights holder, you may not reproduce, distribute, sell, alter or use these materials commercially. Viewing a drawing does not grant a licence to build from it.</p> },
  { id: "conduct", title: "Responsible use", content: <p>Please use the website lawfully. Do not attempt unauthorised access, interfere with its operation, introduce malicious software, impersonate another person or submit unlawful content. When sharing project information, ensure you have permission to share it and provide accurate contact details.</p> },
  { id: "privacy", title: "Privacy and communications", content: <p>Our <a href="/privacy-policy">Privacy Policy</a> explains how website enquiries and personal information are handled. The enquiry form opens your email application; you need to send the prepared email to complete your enquiry. Please avoid sending sensitive material through an initial enquiry.</p> },
  { id: "external", title: "External links", content: <p>The website may link to third-party websites or services for convenience. We do not control their content, availability or policies. Your use of those services is subject to their own terms.</p> },
  { id: "availability", title: "Availability and limitations", content: <><p>We aim to keep website information useful and accurate, but it may contain errors or become outdated. We may update or remove content, and access may be interrupted. Please confirm details directly with us before relying on them for a project decision.</p><p>To the extent permitted by applicable law, Royal Rising is not responsible for loss arising from reliance on general website content or interruptions to website access. Nothing in these terms excludes any responsibility or rights that cannot lawfully be excluded.</p></> },
  { id: "changes", title: "Changes and questions", content: <p>We may revise these website terms as our website or services change. The latest revision date appears above. Contact us with any questions about these terms or to clarify information before starting a project.</p> },
];

export default function TermsAndConditionsPage() {
  return <LegalPage title="Terms & Conditions" intro="The details that guide your use of our website, our project materials and your first conversation with Royal Rising." sections={sections} />;
}
