import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Privacy Policy" description="Privacy Policy for Solmaré Stays." />
      <Header />
      <main className="pt-32 md:pt-36 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl font-semibold text-foreground mb-8">
              Privacy Policy for Solmaré Stays
            </h1>

            <div className="prose prose-stone max-w-none text-muted-foreground">
              <p className="mb-6">
                At Solmaré Stays, one of our main priorities is the privacy of our visitors.
              </p>

              <p className="mb-6">
                This Privacy Policy document contains types of information that is collected and recorded by Solmaré Stays and how we use it.
              </p>

              <p className="mb-6">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at info@solmarestays.com.
              </p>

              <p className="mb-6">
                This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected in Solmaré Stays.
              </p>

              <p className="mb-6">
                This policy is not applicable to any information collected offline or via channels other than this website.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Consent</h2>
              <p className="mb-6">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Information we collect</h2>
              <p className="mb-6">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">How we use your information</h2>
              <p className="mb-4">We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Log Files</h2>
              <p className="mb-6">
                Solmaré Stays follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Cookies and Web Beacons</h2>
              <p className="mb-6">
                Like any other website, Solmaré Stays uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">CCPA Privacy Policy (Do Not Sell My Personal Information)</h2>
              <p className="mb-4">Under the CCPA, among other rights, California consumers have the right to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
              <p className="mb-6">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">GDPR Privacy Policy (Data Protection Rights)</h2>
              <p className="mb-4">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="mb-6">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Children's Information</h2>
              <p className="mb-4">
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p className="mb-6">
                Solmaré Stays does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
