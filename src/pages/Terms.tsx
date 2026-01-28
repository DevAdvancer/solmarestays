import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Terms and Conditions" description="Terms and conditions for using Solmaré Stays website." />
      <Header />
      <main className="pt-32 md:pt-36 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl font-semibold text-foreground mb-8">
              Terms and Conditions
            </h1>

            <div className="prose prose-stone max-w-none text-muted-foreground">
              <p className="mb-6">
                Welcome to Solmaré Stays!
              </p>

              <p className="mb-6">
                These terms and conditions outline the rules and regulations for the use of Solmaré Escapes's Website, located at solmarestays.com.
              </p>

              <p className="mb-6">
                By accessing this website we assume you accept these terms and conditions. Do not continue to use Solmaré Stays if you do not agree to take all of the terms and conditions stated on this page.
              </p>

              <p className="mb-6">
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, the law. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to the same.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">License</h2>
              <p className="mb-4">
                Unless otherwise stated, Solmaré Escapes and/or its licensors own the intellectual property rights for all material on Solmaré Escapes.
              </p>
              <p className="mb-4">
                All intellectual property rights are reserved. You may access this from Solmaré Escapes for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p className="mb-4">You must not:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Republish material from Solmaré Stays</li>
                <li>Sell, rent or sub-license material from Solmaré Stays</li>
                <li>Reproduce, duplicate or copy material from Solmaré Stays</li>
                <li>Redistribute content from Solmaré Stays</li>
              </ul>

              <p className="mb-6">This Agreement shall begin on the date hereof.</p>

              <p className="mb-6">
                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Solmaré Escapes does not filter, edit, publish or review Comments prior to their presence on the website.
                Comments do not reflect the views and opinions of Solmaré Stays, its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Solmaré Stays shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. Solmaré Stays reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
              </p>

              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">You warrant and represent that:</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
              </ul>
              <p className="mb-6">
                You hereby grant Solmaré Stays a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Hyperlinking to our Content</h2>
              <p className="mb-4">The following organizations may link to our Website without prior written approval:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.</li>
              </ul>
              <p className="mb-6">
                These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
              </p>

              <p className="mb-4">We may consider and approve other link requests from the following types of organizations:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
              </ul>
              <p className="mb-6">
                We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Solmaré Escapes; and (d) the link is in the context of general resource information.
              </p>
              <p className="mb-6">
                These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
              </p>
              <p className="mb-6">
                If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Solmaré Escapes. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
              </p>

              <p className="mb-4">Approved organizations may hyperlink to our Website as follows:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
              </ul>
              <p className="mb-6">
                No use of Solmaré Escapes's logo or other artwork will be allowed for linking absent a trademark license agreement.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">iFrames</h2>
              <p className="mb-6">
                Without prior approval and written permission, you may not create frames around our Web Pages that alter in any way the visual presentation or appearance of our Website.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Reservation of Rights</h2>
              <p className="mb-6">
                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Removal of links from our website</h2>
              <p className="mb-6">
                If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
              </p>
              <p className="mb-6">
                We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
              </p>

              <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Disclaimer</h2>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
              </ul>
              <p className="mb-6">
                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
              </p>
              <p className="mb-6">
                As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
