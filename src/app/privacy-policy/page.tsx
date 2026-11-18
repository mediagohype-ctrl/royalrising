import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Royal Rising",
  description: "How Royal Rising handles website enquiries, personal information and privacy requests.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  { id: "overview", title: "About this policy", content: <p>This policy describes how Royal Rising handles information when you browse our website or contact us about architecture, interiors or construction. It covers this website and enquiries made through it. Separate project agreements may describe additional information needed to deliver our services.</p> },
  { id: "information", title: "Information you share", content: <><p>When you make an enquiry, you may share your name, email address, optional phone number, project type and a description of your project. We also receive information you choose to include in subsequent emails or conversations.</p><p>Please share only what is needed for your enquiry. Avoid sending identity documents, financial details or confidential information about others unless we have agreed on an appropriate way to receive it.</p></> },
  { id: "enquiries", title: "How enquiries work", content: <p>The website’s enquiry form prepares a message in your email application. Completing the form does not submit it to a website database. You must send the message from your email application for us to receive it. Your email provider processes that message under its own privacy terms.</p> },
  { id: "use", title: "How information is used", content: <p>Information provided in an enquiry is used to respond, understand your requirements, discuss possible services and manage related communications. If you engage us, relevant information may also be used to prepare proposals, deliver agreed work and maintain necessary business records.</p> },
  { id: "technical", title: "Website data and cookies", content: <><p>The current website does not include advertising trackers, analytics scripts or an account system, and does not set application cookies for those purposes.</p><p>Hosting and network providers may process technical information, such as IP addresses, browser details and request logs, to deliver and protect the website. External websites you visit from our links may use their own cookies and tracking technologies.</p></> },
  { id: "sharing", title: "Sharing and external services", content: <p>Enquiry information may be handled by the people and service providers needed to manage communications or carry out your requested work, including email providers and relevant project collaborators. Information may also need to be disclosed where required by applicable law. Links to services such as Instagram lead to independently operated websites with their own privacy policies.</p> },
  { id: "retention", title: "Retention and security", content: <p>Enquiry and project records should be kept only for as long as needed for the purpose they were collected, including necessary contractual, accounting or legal records. No website or email service can guarantee absolute security. Contact us if you have a concern about information you have shared or would like to discuss its retention.</p> },
  { id: "choices", title: "Your choices and requests", content: <p>You can choose not to provide optional information. You can also contact us to request access to, correction of or deletion of information you have shared, or to ask us to stop further optional communications. We may need to verify your identity before acting on a request. Some records may need to be retained to meet applicable obligations; we will explain any relevant limits when responding.</p> },
  { id: "updates", title: "Updates to this policy", content: <p>This policy may be updated as the website or our information handling changes. The date at the top identifies the latest revision. Please also read our <a href="/terms-and-conditions">Terms &amp; Conditions</a> for information about using the website.</p> },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="A clear view of the information you share with us, how website enquiries work, and how to contact us about your privacy." sections={sections} />;
}
