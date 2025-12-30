import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Privacy() {
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

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: December 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">When you use ShipMates, we collect:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Account Information:</strong> Email address, display name, and profile photo from GitHub OAuth</li>
              <li><strong>Profile Information:</strong> Bio, project URL, tech stack, timezone, and what you are looking for</li>
              <li><strong>Usage Data:</strong> Swipes, matches, and messages with other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Create and manage your account</li>
              <li>Match you with other builders based on your preferences</li>
              <li>Enable messaging between matched users</li>
              <li>Improve our services and user experience</li>
              <li>Send important service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="mb-4">We do not sell your personal information. We share information only:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>With other users as part of the matching feature (your public profile)</li>
              <li>With service providers who help operate ShipMates (e.g., hosting)</li>
              <li>When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Data Security</h2>
            <p>
              We use industry-standard security measures to protect your data, including encryption 
              in transit and at rest. Your authentication is handled securely through Supabase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@tryshipmates.vercel.app
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and preferences. 
              We do not use third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of significant 
              changes by email or through the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@tryshipmates.vercel.app" className="text-brand-400 hover:text-brand-300">
                privacy@tryshipmates.vercel.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
