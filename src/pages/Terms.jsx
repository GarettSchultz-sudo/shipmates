import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Terms() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: December 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ShipMates, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p>
              ShipMates is a platform that connects indie hackers, builders, and entrepreneurs 
              to find cofounders, accountability partners, and collaborators. We facilitate 
              introductions but do not guarantee any outcomes from connections made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>You must provide accurate information when creating your account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must be at least 18 years old to use ShipMates</li>
              <li>One person may only maintain one account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use ShipMates for spam, scams, or fraudulent purposes</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or deceptive content</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Use automated systems to access the service</li>
              <li>Attempt to circumvent security measures</li>
              <li>Use ShipMates for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Content Guidelines</h2>
            <p className="mb-4">Your profile and messages must not contain:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Hate speech or discrimination</li>
              <li>Explicit or inappropriate content</li>
              <li>Personal contact information in public profiles</li>
              <li>Promotional content or advertisements</li>
              <li>Content that infringes on intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms 
              or for any reason at our discretion. You may delete your account at any time 
              by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
            <p>
              ShipMates is provided "as is" without warranties of any kind. We do not guarantee 
              that you will find a cofounder or collaborator, or that connections will be successful.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <p>
              ShipMates and its operators shall not be liable for any indirect, incidental, 
              or consequential damages arising from your use of the service or interactions 
              with other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of ShipMates after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:support@tryshipmates.vercel.app" className="text-brand-400 hover:text-brand-300">
                support@tryshipmates.vercel.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
