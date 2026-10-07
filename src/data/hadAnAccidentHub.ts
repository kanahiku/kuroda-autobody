/**
 * Had an Accident? hub (/had-an-accident/) — copy from the client's content doc.
 * Rendered by `ContentPageView`. The FAQ is grouped into the doc's five categories;
 * answers that end in a button carry a `cta`. `{directionsHref}` is filled in from site config (see lib/content/tokens.ts). No related-links grid (not in the doc).
 */
import type { ContentPage } from '~/data/contentPage';

export const hadAnAccidentHubPages: ContentPage[] = [
  {
    path: '/had-an-accident/',
    seoTitle: 'Had an Accident? Collision Repair Help in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Not sure what to do after an accident? Kuroda Autobody in Waipahu explains your first steps, your right to choose a repair shop, insurance, rental cars and more.',
    eyebrow: 'Had an Accident?',
    hero: {
      titleLead: 'We’ll Help You Through ',
      titleAccent: 'What Comes Next.',
      body: 'An auto accident can leave you with a lot of questions. What should you do first? When should you call your insurance company? Where should you take your car? Whether it’s your first accident or you’ve been through this before, Kuroda will help you understand your options and guide you through the repair process.',
    },
    sections: [
      {
        type: 'steps',
        eyebrow: 'What to do after an accident',
        headingLead: 'A Few Important ',
        headingStrong: 'First Steps.',
        steps: [
          {
            title: 'Make Sure Everyone Is Safe',
            description:
              'If possible, move to a safe location and check yourself and others for injuries. Call 911 when emergency assistance is needed.',
          },
          {
            title: 'Exchange Information',
            description:
              'Get the other driver’s name, contact information, driver’s license, license plate and insurance information.',
          },
          {
            title: 'Document What Happened',
            description:
              'Take photos of the vehicles, damage, license plates and accident scene. If there are witnesses, get their contact information as well.',
          },
          {
            title: 'Report the Accident',
            description:
              'Contact your insurance company to report the accident and start your insurance claim. Depending on the circumstances, you may also need to file a police report.',
          },
          {
            title: 'Choose Your Auto Body Shop',
            description:
              'Your insurance company may recommend a collision repair facility, but you can choose the auto body shop you trust.',
          },
          {
            title: 'Contact Kuroda',
            description: 'Schedule a collision repair estimate and we’ll help you understand what happens next.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Know your options',
        headingLead: 'Your Car. ',
        headingAccent: 'Your Choice.',
        paragraphs: [
          'Your insurance company may recommend a repair facility or provide a list of auto body shops, but you don’t have to choose a body shop simply because it appears on that list.',
          'Choose a collision repair facility based on what matters to you—quality, experience, service and confidence that your vehicle will be repaired properly.',
          'Once you choose Kuroda, we’ll work with your insurance company throughout the collision repair process.',
        ],
        photoLabel: 'Choosing your repair shop',
      },
      {
        type: 'story',
        eyebrow: 'Working with insurance',
        headingLead: 'We Help Make ',
        headingAccent: 'the Process Easier.',
        paragraphs: [
          'Insurance can be one of the most confusing parts of an accident. Kuroda works with insurance companies every day and can help guide you through the process.',
          'We’ll coordinate with your insurer on the repair estimate and necessary approvals. If additional accident-related damage is discovered after repairs begin, we’ll document it and work with the insurance company on any necessary supplemental estimate.',
          'We’ll also keep you informed, so you know what’s happening with your vehicle and what to expect next.',
        ],
        photoLabel: 'Working with your insurance company',
        isReversed: true,
      },
      {
        type: 'story',
        eyebrow: 'Getting a rental car',
        headingLead: 'Keep Moving While ',
        headingAccent: 'Your Car Is Being Repaired.',
        paragraphs: [
          'Kuroda can arrange convenient on-site rental car pickup for any customer who needs one.',
          'If your insurance policy includes rental coverage, check with your insurer to confirm your coverage and limits. If not, you can still rent a vehicle at your own expense. Either way, we’ll help coordinate the details to make the transition as easy as possible.',
        ],
        photoLabel: 'On-site rental car pickup',
      },
    ],
    faqs: {
      eyebrow: 'FAQs',
      titleLead: 'Frequently Asked ',
      titleStrong: 'Questions',
      groups: [
        {
          title: 'Estimates & Insurance',
          items: [
            {
              title: 'How do I get a collision repair estimate?',
              description:
                'Schedule an estimate online at a convenient time. We’ll inspect your vehicle, assess the collision damage and determine what repairs are needed.',
              cta: { text: 'Schedule an Estimate', href: '/contact/' },
            },
            {
              title: 'Do I have to use the auto body shop my insurance company recommends?',
              description:
                'No. Your insurance company may recommend a collision repair facility or provide a list of shops, but you can choose the auto body shop you trust. Once you choose Kuroda, we’ll work with your insurance company throughout the repair process.',
            },
            {
              title: 'Do I need to get more than one estimate?',
              description:
                'Generally, you don’t need to get multiple estimates unless your insurance company specifically requires them. You can choose the collision repair facility you trust and have your vehicle inspected there.',
            },
            {
              title: 'Will Kuroda work with my insurance company?',
              description:
                'Yes. We work with insurance companies on repair estimates, approvals and supplemental estimates if additional accident-related damage is discovered after repairs begin. We’ll also keep you informed throughout the process.',
            },
            {
              title: 'Where do I get my insurance claim number?',
              description:
                'Your insurance company will provide a claim number after you report the accident and open a claim. Keep it handy—it helps us communicate with your insurer about your repair.',
            },
            {
              title: 'Can I get an estimate if I’m paying for the repair myself?',
              description:
                'Yes. You don’t need an insurance claim to have your vehicle repaired at Kuroda. Schedule an estimate and we’ll assess the damage and discuss your repair options with you.',
            },
            {
              title: 'What if my insurance company’s estimate is different from Kuroda’s?',
              description:
                'Insurance estimates may differ from what’s needed to properly repair your vehicle. We’ll review the estimate and work with your insurance company to address differences and any additional accident-related damage identified during the repair.',
            },
            {
              title: 'What is my insurance deductible?',
              description:
                'Your deductible is the amount your insurance policy requires you to pay toward a covered repair before insurance pays the remaining eligible costs. Your insurance company can confirm your deductible and how it applies to your claim.',
            },
          ],
        },
        {
          title: 'Your Repair',
          items: [
            {
              title: 'Can I drive my car after an accident?',
              description:
                'If you’re unsure whether your vehicle is safe to drive, don’t take the chance. Damage to wheels, steering, lights, airbags or other safety systems may not always be obvious. Contact Kuroda to discuss the damage and the safest way to get your vehicle to our shop.',
            },
            {
              title: 'Does Kuroda repair all makes and models?',
              description:
                'Yes. Kuroda provides collision and auto body repair for most makes and models. Our technicians have the training, equipment and diagnostic capabilities needed to work on a wide range of today’s vehicles.',
            },
            {
              title: 'What types of collision repair does Kuroda handle?',
              description:
                'Kuroda handles everything from minor dents and body damage to structural and frame repair, bumper repair and replacement, auto paint and refinishing, vehicle diagnostic scanning, and coordination of ADAS calibration and auto glass replacement.',
            },
            {
              title: 'How long will my collision repair take?',
              description:
                'Every repair is different. The extent of the damage and work required can affect timing. Once repairs begin, we’ll keep you informed about your vehicle’s progress and expected completion.',
            },
            {
              title: 'What happens if you find additional damage during the repair?',
              description:
                'Some collision damage may not become apparent until repairs are underway. If additional accident-related damage is discovered, we’ll document it and work with your insurance company on any necessary supplemental estimate.',
            },
            {
              title: 'Can Kuroda match my vehicle’s paint color?',
              description:
                'Kuroda uses a Sikkens® refinishing system with digital color-matching technology to create a precise paint formula. Careful blending helps achieve a seamless finish between repaired and existing surfaces.',
            },
            {
              title: 'Does Kuroda handle ADAS calibration?',
              description:
                'Yes. When collision repairs affect cameras, radar or sensors, Kuroda coordinates required Advanced Driver Assistance System (ADAS) calibrations with qualified specialists on site or through the manufacturer’s dealership, depending on the vehicle and systems affected.',
            },
            {
              title: 'Does Kuroda perform vehicle diagnostic scanning?',
              description:
                'Yes. Kuroda has original-equipment scanning capabilities for Toyota, Honda, Nissan, Kia, Hyundai, Subaru, Mazda, Ford, GM and Chrysler, along with Bosch and Autoland aftermarket diagnostic systems.',
            },
          ],
        },
        {
          title: 'Quality & Credentials',
          items: [
            {
              title: 'Does Kuroda warranty its collision repairs?',
              description:
                'Kuroda provides Limited Lifetime Warranty coverage on qualifying metalwork and refinishing repairs for as long as you own your vehicle. Other repairs and parts carry specific warranty terms.',
              cta: { text: 'View Warranty Details', href: '/warranty/' },
            },
            {
              title: 'Is Kuroda Auto Body certified?',
              description:
                'Kuroda is an I-CAR Gold Class collision repair facility, and our team includes ASE-certified technicians who receive ongoing industry training as vehicle technology and repair methods evolve.',
            },
            {
              title: 'Does Kuroda offer OEM collision repair?',
              description:
                'Kuroda participates in OEM collision repair programs for Honda, Acura, Nissan, GM and Chrysler, providing access to vehicle-specific repair information, procedures and standards.',
            },
          ],
        },
        {
          title: 'Drop-Off, Transportation & Pick Up',
          items: [
            {
              title: 'Can Kuroda arrange a rental car?',
              description:
                'Yes. Kuroda can arrange convenient on-site rental car pickup for customers who need transportation while their vehicle is being repaired. If your insurance includes rental coverage, check with your insurer for coverage and limits. If not, you can still rent a vehicle at your own expense.',
            },
            {
              title: 'What should I do before dropping off my vehicle?',
              description:
                'Remove valuables and personal belongings, including items in the trunk, garage-door openers, parking passes and child safety seats. Please also bring any keys needed for the repair, including your wheel-lock key if applicable. If you need a rental car, let us know and we’ll arrange convenient on-site pickup.',
            },
            {
              title: 'What happens when I pick up my vehicle?',
              description:
                'Before you drive away, we’ll walk around your vehicle with you, review the work completed and answer any questions you have about the repair.',
            },
          ],
        },
        {
          title: 'Location & Hours',
          items: [
            {
              title: 'Where is Kuroda Auto Body located?',
              description:
                'Kuroda Auto Body is located in Gentry Waipio Business Park at 94-518 Puahi Street, Waipahu, HI 96797. The shop is conveniently located just off the freeway and serves customers from throughout Oahu.',
              cta: { text: 'Get Directions', href: '{directionsHref}' },
            },
            {
              title: 'What are Kuroda Auto Body’s hours?',
              description: 'Kuroda is open Monday through Friday, 7am to 5pm, and closed Saturday and Sunday.',
            },
          ],
        },
      ],
    },
    cta: { title: 'Schedule Your ', titleStrong: 'Estimate Today' },
  },
];
