import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Camera, DollarSign, MessageSquare, Sparkles, Wrench, FileText, Palette, Phone } from 'lucide-react';

const managementSteps = [
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'We capture your property at its best with professional photography and create compelling listings that attract high-quality guests.',
    details: 'Our professional photographers use high-end equipment and optimal lighting to showcase every detail of your property.',
  },
  {
    icon: DollarSign,
    title: 'Dynamic Pricing',
    description: 'Our advanced pricing algorithms adjust nightly rates based on demand, seasonality, and local events to maximize your revenue.',
    details: 'We analyze market data in real-time and adjust pricing automatically to ensure optimal occupancy and maximum returns.',
  },
  {
    icon: MessageSquare,
    title: 'Guest Communication',
    description: '24/7 guest support from booking to checkout. We handle all inquiries, concerns, and ensure 5-star experiences.',
    details: 'Our dedicated team responds to guests within minutes, handling everything from special requests to emergency situations.',
  },
  {
    icon: Sparkles,
    title: 'Professional Cleaning',
    description: 'Meticulous cleaning between every stay with hotel-quality linens and amenities to maintain your property\'s premium feel.',
    details: 'Our vetted cleaning partners follow a detailed checklist ensuring every corner meets our high standards.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Inspections',
    description: 'Regular property inspections and coordinated maintenance to protect your investment and prevent issues.',
    details: 'We conduct thorough inspections after each guest and coordinate any repairs with our trusted network of contractors.',
  },
  {
    icon: FileText,
    title: 'Financial Reporting',
    description: 'Transparent monthly statements and real-time dashboards so you always know how your property is performing.',
    details: 'Access detailed reports on occupancy, revenue, expenses, and guest reviews through our owner portal.',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description: 'Expert staging and design consultation to ensure your property photographs beautifully and guests feel at home.',
    details: 'Our design team can recommend updates that increase booking rates and guest satisfaction scores.',
  },
  {
    icon: Phone,
    title: '24/7 Emergency Response',
    description: 'Round-the-clock emergency support for both guests and properties. Peace of mind, always.',
    details: 'Our emergency line is staffed 24/7 to handle any situation, from lockouts to property emergencies.',
  },
];

export function ManagementSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            How We Manage Your Property
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Full-service management that handles every detail so you can enjoy the returns without the work.
          </p>
        </motion.div>

        {/* Scrollable Cards Container */}
        <div 
          ref={scrollRef}
          className="relative max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary-foreground/20 scrollbar-track-transparent"
        >
          <div className="space-y-4">
            {managementSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div 
                  className={`bg-primary-foreground/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:bg-primary-foreground/15 ${
                    openIndex === index ? 'ring-2 ring-gold/50' : ''
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-4 p-5">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0"
                    >
                      <step.icon className="w-6 h-6 text-gold" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/70 line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-primary-foreground/60" />
                    </motion.div>
                  </div>
                  
                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="pl-16 border-l-2 border-gold/30 ml-6">
                        <p className="text-primary-foreground/80 leading-relaxed">
                          {step.description}
                        </p>
                        <p className="text-primary-foreground/60 text-sm mt-3">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
