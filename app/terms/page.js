import Navigation from "../_components/navigation/Navigation";
import Footer from "../_components/footer/Footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="container mx-auto flex-grow px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Terms and Conditions</h1>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Introduction</h2>
          <p>
            Welcome to JTicketing.com! By accessing or using our website, you
            agree to comply with the following Terms and Conditions. Please read
            them carefully before purchasing tickets or using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Ticket Purchase & Pricing</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              All ticket prices are listed in the applicable currency and may be
              subject to additional fees and taxes.
            </li>
            <li>
              Prices are subject to change without prior notice due to demand,
              availability, or changes from event organisers.
            </li>
            <li>
              Your ticket purchase is confirmed only after you receive an
              official confirmation email.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Order Confirmation</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Upon successful payment, you will receive an email confirmation
              containing your ticket details.
            </li>
            <li>
              If you do not receive a confirmation email within 24 hours, please
              check your spam folder or contact customer support.
            </li>
            <li>
              We are not responsible for incorrect email addresses and phone
              numbers or any issues resulting from failed delivery of
              confirmation emails.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            Refund & Cancellation Policy
          </h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              All ticket sales are final. We do not offer refunds, exchanges, or
              cancellations once a purchase is completed.
            </li>
            <li>
              If an event is canceled, JTicketing.com will provide a refund in
              accordance with the event organisers&apos; refund policy.
            </li>
            <li>
              If an event is postponed, your ticket remains valid for the new
              date.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            Event Changes & Postponements
          </h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Event dates, venues, and seating arrangements are subject to
              change at the discretion of the event organiser.
            </li>
            <li>
              In case of event postponement, tickets will remain valid for the
              rescheduled date.
            </li>
            <li>
              JTicketing.com is not responsible for losses incurred due to event
              changes.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Delivery of Tickets</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>We only provide e-tickets and PAH (Print-at-Home) tickets.</li>
            <li>Tickets will be sent via email or through WhatsApp.</li>
            <li>
              Customers are responsible for ensuring they have access to their
              tickets before the event.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Prohibited Activities</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Reselling tickets purchased from JTicketing.com for profit is
              strictly prohibited.
            </li>
            <li>
              Fraudulent activity, including using stolen payment methods, will
              result in order cancellation and possible legal action.
            </li>
            <li>
              Unauthorised use of our website for illegal purposes is strictly
              prohibited.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Liability Disclaimer</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              JTicketing.com acts as a ticket marketplace and is not responsible
              for event quality, artist performances, or venue conditions.
            </li>
            <li>
              We are not liable for any losses, damages, or injuries that may
              occur before, during, or after an event.
            </li>
            <li>
              In no event shall JTicketing.com’s liability exceed the total
              ticket purchase price.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            Privacy Policy & Data Protection
          </h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              We collect and store customer data solely for order processing and
              customer service.
            </li>
            <li>
              JTicketing.com does not share personal data with third parties
              without consent, except where required by law.
            </li>
            <li>
              By using our services, you agree to our Privacy Policy, which
              outlines how we handle your data.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Governing Law</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              These Terms and Conditions are governed by the laws of Malaysia
              and Singapore.
            </li>
            <li>
              Any disputes arising from ticket purchases or website usage will
              be handled under the applicable jurisdiction.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
          <p>
            For any inquiries, please reach out to our customer support team via
            email or our contact page.
          </p>
        </section>

        <section>
          <p className="font-medium">
            By using JTicketing.com, you acknowledge and agree to these Terms
            and Conditions.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
