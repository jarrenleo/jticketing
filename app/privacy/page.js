import Navigation from "../_components/navigation/Navigation";
import Footer from "../_components/footer/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto flex-grow px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Introduction</h2>
          <p>
            At JTicketing.com, we are committed to protecting your privacy and
            ensuring that your personal data is handled securely and
            responsibly. This Privacy Policy outlines how we collect, use, and
            protect your information when you use our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Information We Collect</h2>
          <p className="mb-2">
            We may collect the following types of personal information:
          </p>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              <strong>Personal Details:</strong> Name, email address, phone
              number, and billing address.
            </li>
            <li>
              <strong>Payment Information:</strong> Payment method details for
              ticket purchases (processed securely by third-party payment
              providers).
            </li>
            <li>
              <strong>Account Information:</strong> Username, password, and
              purchase history.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information, and website usage statistics.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            How We Use Your Information
          </h2>
          <p className="mb-2">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc space-y-2 pl-4">
            <li>To process and confirm ticket purchases.</li>
            <li>
              To send transaction confirmations, event updates, and customer
              support responses.
            </li>
            <li>To improve our website experience and personalise content.</li>
            <li>To prevent fraudulent transactions and ensure security.</li>
            <li>
              To comply with legal requirements and enforce our Terms and
              Conditions.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Data Sharing & Security</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              We do not sell or share your personal data with third parties for
              marketing purposes.
            </li>
            <li>
              Your data is shared only with trusted third-party service
              providers (e.g., payment processors, event organisers) for
              necessary transaction processing.
            </li>
            <li>
              We implement industry-standard security measures to protect your
              data from unauthorised access and breaches.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            Cookies & Tracking Technologies
          </h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Our website uses cookies to improve functionality, analyse website
              traffic, and enhance your browsing experience.
            </li>
            <li>
              You can manage or disable cookies through your browser settings,
              but this may affect certain features of our website.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Your Rights & Choices</h2>
          <p>
            You have the right to request details about how we process your
            data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary for
            transaction processing, legal compliance, and security purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not
            responsible for the privacy practices of external websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
          <p>
            For any privacy-related inquiries or concerns, please contact our
            support team via email or our WhatsApp.
          </p>
        </section>

        <section>
          <p className="font-medium">
            By using JTicketing.com, you consent to the collection and use of
            your information as outlined in this Privacy Policy.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
