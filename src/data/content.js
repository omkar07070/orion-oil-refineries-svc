/**
 * Orion Oil Website — Central Content Data
 * All hardcoded text, contact info, navigation, and configuration lives here.
 * Edit this file to update site copy, contact details, WhatsApp number, etc.
 */

/** @type {string} WhatsApp number in international format (no spaces or dashes) */
export const WHATSAPP_NUMBER = '918275635579'

/** @type {string} Pre-filled WhatsApp message */
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello! I am interested in Orion Oil products. Please provide more information.'
)

/** @type {string} Orion Oil email address for direct enquiries */
export const ORION_EMAIL = 'orionoilandgas@gmail.com'

/** @type {string} Google Form URL for quote requests */
export const GOOGLE_FORM_URL = 'https://forms.google.com/example-quote-form'

/** @type {string} Company name */
export const COMPANY_NAME = 'Orion Oil and Gas'

/** @type {string} GST number */
export const GST_NUMBER = '27CCYPT9193H1ZC'

export const contact = {
  address: 'S-32, MIDC Bhosari, Pune 411026, Maharashtra, INDIA',
  email: 'orionoilandgas@gmail.com',
  phone: '+91 8275635579',
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'Quality', href: '/quality' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact Us', href: '/contact' },
]

export const homePage = {
  hero: {
    headline: 'Engineering the Future of',
    headlineAccent: 'Sustainable Lubricants',
    subheadline: 'Premium Base Oils and Industrial Fuels, Proudly Refined in Pune, Maharashtra.',
  },
  whoWeAre: {
    title: 'The Circular Economy,',
    titleAccent: 'Perfected',
    description:
      'At Orion Oil, we re-engineer used engine oil\'s heaviest components into high-performance industrial materials. Based in MIDC Bhosari, Pune, we are fundamentally transforming how the industrial sector approaches resource recovery.',
    description2:
      'Utilizing our advanced, high-vacuum continuous batch distillation process, we rescue the heaviest hydrocarbon chains from waste engine and industrial oils, preventing them from becoming environmental hazards.',
  },
  productsOverview: {
    title: 'Our',
    titleAccent: 'Products',
    subtitle: 'Premium-grade base oils and industrial fuels refined from 100% recycled feedstocks',
  },
  sustainability: {
    title: 'Committed to a',
    titleAccent: 'Sustainable Future',
    subtitle: 'Our zero-waste refining process ensures every fraction of the feedstock is captured',
    features: [
      {
        title: 'Zero-Waste Process',
        description: 'Every drop of feedstock is captured and repurposed. From premium base oils to industrial fuels and asphalt modifiers.',
      },
      {
        title: 'EPR Compliance',
        description: 'We support Extended Producer Responsibility compliance targets, helping our partners meet regulatory requirements.',
      },
      {
        title: 'Scope 3 Reduction',
        description: 'By replacing virgin materials with re-refined products, we help industrial plants significantly reduce their carbon footprint.',
      },
    ],
  },
  stats: [
    { value: '100%', label: 'Waste Oil Recovery' },
    { value: '70%', label: 'Base Oil Yield per Batch' },
    { value: '4,000L', label: 'Batch Capacity' },
    { value: 'Net-Zero', label: 'By 2070 Target' },
  ],
  cta: {
    title: 'Ready to Partner with Orion Oil?',
    description:
      'Get premium base oils and industrial fuels with unmatched quality, pricing, and supply chain reliability.',
  },
}

export const aboutPage = {
  pageHeader: {
    title: 'About',
    titleAccent: 'ORION OIL',
    subtitle: 'The Circular Economy, Engineered for Excellence',
  },
  whoWeAre: {
    title: 'Who We Are',
    content: [
      'Based in MIDC Bhosari, Pune, Orion Oil is fundamentally transforming how the industrial sector approaches resource recovery. We do not just recycle; we meticulously re-engineer.',
      'Utilizing our advanced, high-vacuum continuous batch distillation process, we rescue the heaviest hydrocarbon chains from waste engine and industrial oils, preventing them from becoming environmental hazards.',
      'Powered by a highly efficient gas-fired thermic fluid heating system, we process these materials with absolute precision. This ensures zero thermal degradation, restoring the oil to a virgin-like state to deliver uncompromising, premium-grade base oils and industrial fuels.',
    ],
  },
  mission: {
    title: 'Our Mission',
    subtitle: 'Empowering Indian Manufacturing Through Domestic Independence',
    content: [
      'Our mission is to radically simplify supply chain management for Indian blenders and manufacturers by providing a highly reliable, domestic source of premium base oils and industrial co-products.',
      'For too long, the industry has been forced to rely heavily on expensive, volatile imported materials. Orion Oil bridges this critical gap. By refining high-quality products locally in Maharashtra, we offer our partners superior pricing margins, rapid dispatch capabilities, and a fortified supply chain they can trust.',
      'We are committed to building a robust local ecosystem where premium quality meets unmatched economic advantage.',
    ],
  },
  vision: {
    title: 'Our Vision',
    subtitle: 'Driving India\'s Sustainable Industrial Future',
    content: [
      'Our vision over the next 15 years is to be the undisputed cornerstone of the circular economy within the lubricants sector. We are relentlessly scaling our zero-waste refining capabilities to actively slash national carbon emissions, directly supporting India\'s bold mandate to achieve net-zero emissions by 2070.',
      'By maximizing resource recovery and providing 100% sustainable materials, we empower our clients to effortlessly conquer their Scope 3 emission targets and EPR compliance mandates.',
      'We envision a thriving industrial landscape where peak operational performance and absolute environmental responsibility are one and the same.',
    ],
  },
  facility: {
    title: 'Our',
    titleAccent: 'Facility',
    subtitle: 'State-of-the-art refining infrastructure coming soon',
    comingSoon: 'December 2026',
    specs: [
      { value: '5,000L', label: 'Batch Kettle Capacity' },
      { value: '350°C', label: 'Thermal Fluid Temp' },
      { value: '1-2 Torr', label: 'Deep Vacuum' },
    ],
  },
  whyChooseUs: [
    {
      title: '100% Domestic',
      description: 'Proudly made in Maharashtra, India. No import dependencies, no currency fluctuations, no supply chain uncertainties.',
    },
    {
      title: 'Premium Quality',
      description: 'Virgin-like molecular integrity achieved through advanced deep-vacuum batch distillation. ASTM color 1-2.',
    },
    {
      title: 'Zero-Waste Process',
      description: 'Every fraction captured: Premium Base Oil, Industrial LDO, and Asphalt Modifier. Nothing goes to waste.',
    },
    {
      title: 'Rapid Dispatch',
      description: 'Efficient batch processing enables quick turnaround times for all orders, big or small.',
    },
    {
      title: 'EPR Compliant',
      description: 'Fully registered facility to help your organization meet Extended Producer Responsibility targets.',
    },
    {
      title: 'Cost Effective',
      description: 'Superior pricing margins compared to imported alternatives without compromising on quality.',
    },
  ],
}

export const productsPage = {
  pageHeader: {
    title: 'Our',
    titleAccent: 'Products',
    subtitle: 'Premium-grade base oils and industrial fuels refined from 100% recycled feedstocks',
  },
  baseOils: {
    title: 'Base',
    titleAccent: 'Oils',
    subtitle: 'Premium Group II equivalent base oils with virgin-like performance characteristics',
    products: [
      {
        id: 'sn150',
        name: 'PREMIUM BASE OIL SN-150 EQUIVALENT',
        description:
          'Highly refined, straight-cut base oil engineered from premium automotive feedstocks using our advanced batch-wise distillation process. Providing excellent oxidation stability, this Group II equivalent is ideal for formulating high-performance engine oils, hydraulic fluids, and light industrial lubricants.',
        specsPdf: '/docs/base-oil-sn150-specs.pdf',
      },
      {
        id: 'sn300',
        name: 'PREMIUM BASE OIL SN-300 EQUIVALENT',
        description:
          'A heavier, superior quality Group I equivalent base oil offering exceptional film strength and thermal stability. Processed via deep-vacuum distillation with precision gas-fired thermic heating to ensure zero thermal cracking. Perfect for heavy-duty gear oils, metalworking fluids, and robust industrial applications.',
        specsPdf: '/docs/base-oil-sn300-specs.pdf',
      },
    ],
  },
  industrialFuels: {
    title: 'Industrial',
    titleAccent: 'Fuels',
    subtitle: 'High-efficiency fuels derived from recycled feedstocks',
    product: {
      id: 'ldo',
      name: 'INDUSTRIAL LDO (LIGHT DISTILLATE OIL)',
      description:
        'Captured during the initial dehydration phase of our batch-wise distillation process, this powerful, low-cost LDO alternative is derived from the highly combustible light ends of waste engine and industrial oils. Delivering a high calorific value, it provides maximum thermal efficiency for industrial furnaces, boilers, thermic fluid heaters, and heavy forging plants at an incredibly economical price point.',
      specsPdf: '/docs/ldo-specs.pdf',
    },
  },
  asphalt: {
    title: 'Asphalt /',
    titleAccent: 'Bitumen',
    subtitle: 'High-viscosity industrial binder from zero-waste refining',
    product: {
      id: 'bitumen',
      name: 'ASPHALT MODIFIER / BITUMEN',
      description:
        'The heavy bottoms remaining after our deep-vacuum distillation process are discharged hot to create this dense, highly viscous bitumen product. By rescuing the heaviest hydrocarbon chains without thermal degradation, we produce an industrial binder with highly stable, excellent binding properties. It serves as a rugged foundation perfect for road construction (asphalt blending), roofing felts, waterproofing compounds, and heavy industrial coatings.',
      specsPdf: '/docs/bitumen-specs.pdf',
    },
  },
  dispatchOptions: [
    {
      title: '210 Liter Drums',
      description: 'MS (Mild Steel) or HDPE Drums available for base oils and industrial fuels',
    },
    {
      title: '1000 Liter IBC Tanks',
      description: 'Intermediate Bulk Containers for larger volume requirements',
    },
    {
      title: 'Bulk Road Tanker',
      description: 'Full truckload dispatch for maximum cost efficiency',
    },
  ],
}

export const technologyPage = {
  pageHeader: {
    title: 'Our',
    titleAccent: 'Technology',
    subtitle: 'Advanced Vacuum Distillation for Zero-Degradation Refining',
  },
  vacuumDistillation: {
    title: 'Advanced',
    titleAccent: 'Vacuum Distillation',
    subtitle: 'Precision Engineering for Zero-Degradation Refining',
    intro: [
      'Traditional continuous-flow recycling systems often compromise the molecular integrity of the oil through extreme heat and thermal cracking. At Orion Oil, we have rejected the standard approach. Our facility utilizes a highly specialized, custom-engineered batch-wise distillation architecture designed exclusively for the complex processing of waste engine and industrial oils.',
      'By operating under extreme deep-vacuum conditions and utilizing a highly calibrated gas-fired thermal system, we achieve a level of fractional precision that ensures every drop of recovered base oil retains its virgin-like performance characteristics.',
    ],
    pillars: [
      {
        title: '1. Extreme Deep-Vacuum Environment (1-2 Torr)',
        description:
          'The cornerstone of our process is the artificial suppression of the oil\'s boiling point. By dropping the internal atmospheric pressure of our custom 5,000-liter batch kettles down to an absolute vacuum of 1 to 2 mm Hg (Torr), we evaporate heavy hydrocarbon chains at significantly lower temperatures.',
        points: [
          {
            bold: 'Zero Thermal Degradation:',
            text: ' Because the oil is never exposed to excessive, destructive heat, the hydrocarbon molecules are never burned or cracked during the heavy extraction phase.',
          },
          {
            bold: 'Odor & Impurity Reduction:',
            text: ' The deep-vacuum environment continuously draws out volatile contaminants and sulfur compounds, leaving a cleaner, highly stable distillate.',
          },
        ],
      },
      {
        title: '2. Dual-Stage Thermal Fluid Heating',
        description:
          'Consistent, controlled heat transfer is vital to molecular preservation. Rather than relying on direct firing, our plant utilizes an advanced, PID-controlled gas-fired thermic fluid heating system.',
        points: [
          {
            bold: 'Precision Heat Transfer:',
            text: ' We circulate specialized thermal fluids at exactly 350°C through a dual-heating matrix.',
          },
          {
            bold: 'Synchronized Infrastructure:',
            text: ' The kettle is equipped with an integrated limpet coil, working in perfect synchronization with a highly efficient shell-and-tube reboiler (featuring seamless SS 304 tubes). This ensures rapid, evenly distributed heat without localized hot spots that could damage the oil.',
          },
        ],
      },
      {
        title: '3. Meticulous Batch-Wise Precision',
        description:
          'We prioritize absolute control over speed. Our system is engineered to process high-capacity 4,000-liter batches over a precisely timed 8-hour cycle.',
        points: [
          {
            bold: 'Fractional Extraction:',
            text: ' This batch-wise approach allows us to strictly monitor and isolate distinct molecular cuts at different time intervals—seamlessly separating moisture, extracting our Industrial LDO at 5 mm Hg, and finally capturing the Premium Base Oil during the extended deep-vacuum phase.',
          },
          {
            bold: 'Heavy Bottoms Recovery:',
            text: ' The remaining uncracked residue is easily captured at the end of the batch, yielding our dense, high-performance Asphalt Modifier.',
          },
        ],
      },
    ],
    result:
      'Our advanced vacuum distillation technology guarantees that the base oil we recover is structurally identical to virgin feedstocks. For lubricant blenders and industrial manufacturers, this means access to a highly refined, naturally high-viscosity product with exceptional oxidation stability—all while actively supporting a closed-loop, zero-waste circular economy.',
  },
  refiningProcess: {
    title: 'Our',
    titleAccent: 'Refining Process',
    subtitle: 'Engineered for Zero-Waste & Maximum Yield',
    steps: [
      {
        number: 1,
        title: 'Pre-Treatment & Dehydration',
        description:
          'The refining cycle begins by loading a 4,000-liter batch of specialized waste engine and industrial oil into our 5 KL gross capacity kettle. During this initial stage, the feedstock is strictly preheated for one hour. Once the exact temperature is reached, we apply a 70 mm Hg absolute vacuum for one hour to safely evaporate and extract all water content. This complete dehydration stabilizes the oil for the extreme thermal processing ahead.',
      },
      {
        number: 2,
        title: 'Deep Vacuum Distillation',
        description:
          'The dehydrated oil is subjected to advanced fractional distillation utilizing a precision-controlled, gas-fired thermic fluid heating system operating at 350°C. We first extract the light diesel and LDO cuts under a 5 mm Hg vacuum. The system pressure is then dropped to a deep 1 to 2 mm Hg absolute vacuum for an extended 5-hour evaporation phase. This extreme vacuum artificially lowers the boiling point, allowing us to safely extract up to 70% of the premium heavy oil fractions (approx. 2,520 kg per batch) without any thermal degradation or molecular cracking.',
      },
      {
        number: 3,
        title: 'Chemical Polishing',
        description:
          'Distillation is followed by a rigorous, continuous purification phase utilizing our specialized oil polishing skid, engineered to process 4.8 Tons every 24 hours. The distilled oil undergoes forced percolation through a 20-column matrix loaded with a specialized, highly reactive Alumina Bauxite blend. This advanced percolation neutralizes total acid numbers (TAN), extracts microscopic sludge, and dramatically restores the oil\'s visual clarity, achieving an ASTM color rating of ~3 in just a single pass.',
      },
      {
        number: 4,
        title: 'Final Testing & Quality Check',
        description:
          'Every batch is held to uncompromising industrial standards before it leaves our facility. Samples are pulled directly from the polishing discharge and analyzed by a NABL accredited Third Party Inspection (TPI) laboratory. Utilizing advanced chemical analysis instrumentation—including Gas Chromatography, FTIR, and AAS—we verify that the kinematic viscosity, flash point, copper corrosion, and specific gravity perfectly match our strict internal baselines and exact customer requirements.',
      },
      {
        number: 5,
        title: 'Premium Base Oil & By-Products',
        description:
          'Our batch-wise architecture is a true closed-loop, zero-waste system. The primary yield is our flagship Premium Base Oil (SN-150 and SN-300 equivalents), restored to a virgin-like state. Simultaneously, we capture 100% of the by-products for industrial use: the light ends are condensed into our high-energy Industrial LDO, while the remaining 720 kg of heavy, uncracked residue is safely discharged from the kettle to serve as a high-viscosity Asphalt Modifier for road and infrastructure applications.',
      },
    ],
  },
  yieldSummary: {
    title: 'Process',
    titleAccent: 'Yield Summary',
    subtitle: 'True closed-loop, zero-waste system',
    yields: [
      { value: '2,520 kg', label: 'Premium Base Oil per batch (70% yield)' },
      { value: '760 kg', label: 'Industrial LDO per batch (19% yield)' },
      { value: '720 kg', label: 'Asphalt Modifier per batch (18% yield)' },
      { value: '100%', label: 'Waste feedstocks recovered' },
    ],
  },
}

export const qualityPage = {
  pageHeader: {
    title: 'Quality &',
    titleAccent: 'Sustainability',
    subtitle: 'Uncompromising Standards. Zero-Waste Commitment.',
  },
  qualityAssurance: {
    title: 'Quality',
    titleAccent: 'Assurance',
    subtitle: 'Every batch undergoes rigorous, independent testing',
    description:
      'Every batch undergoes rigorous, independent testing and is fully verified by certified Third-Party Inspection (TPI) to ensure uncompromising adherence to international quality standards.',
    points: [
      {
        bold: 'Independent Laboratory Testing:',
        text: ' Complete external verification utilizing advanced GC, FTIR, and AAS instrumentation to guarantee unbiased results.',
      },
      {
        bold: 'ASTM Standard Compliance:',
        text: ' Strict adherence to internationally recognized testing methodologies.',
      },
      {
        bold: 'Batch-wise Quality Certification:',
        text: ' Individual certificates of analysis generated for every 4,000-liter batch by accredited testing facilities.',
      },
      {
        bold: 'Third-Party Inspection (TPI):',
        text: ' 100% independent verification ensures complete transparency, accuracy, and compliance before dispatch.',
      },
    ],
    equipment: [
      { name: 'Gas Chromatography (GC)', description: 'Molecular composition analysis and hydrocarbon profiling' },
      { name: 'FTIR Spectroscopy', description: 'Functional group analysis and contamination detection' },
      { name: 'Atomic Absorption (AAS)', description: 'Trace metal content and elemental analysis' },
      { name: 'Elemental Analysis', description: 'Comprehensive elemental composition verification' },
    ],
  },
  sustainability: {
    title: 'Sustainability',
    titleAccent: 'Commitment',
    subtitle: 'Engineering industrial value while protecting our planet',
    description:
      'We believe in engineering industrial value while aggressively protecting our planet. Our high-vacuum batch distillation architecture guarantees that hazardous waste is transformed into premium resources, creating a sustainable foundation for the manufacturing sector.',
    points: [
      {
        bold: '100% Waste Oil Recovery:',
        text: ' Our specialized architecture ensures that every fraction of the feedstock is captured and repurposed, rescuing heavy hydrocarbons from disposal.',
      },
      {
        bold: 'Lower Carbon Footprint:',
        text: ' By replacing virgin fuels and lubricants with our re-refined LDO and Base Oils, industrial plants can significantly lower their Scope 3 emissions.',
      },
      {
        bold: 'Circular Economy Integration:',
        text: ' We actively convert hazardous used engine oil into a premium resource, allowing our partners to claim a higher percentage of recycled content in their finished goods.',
      },
      {
        bold: 'EPR Compliance Support:',
        text: ' With our fully registered and compliant facility, partnering with Orion Oil directly assists your organization in effortlessly meeting and documenting your Extended Producer Responsibility (EPR) targets for hazardous waste diversion.',
      },
      {
        bold: 'Zero-Waste Refining Process:',
        text: ' From our clear, golden base oils at the top of the fraction to the heavy, stable asphalt binder at the bottom of the barrel, absolutely nothing is wasted.',
      },
    ],
    stats: [
      { value: '100%', label: 'Waste Oil Recovered & Repurposed' },
      { value: '0 kg', label: 'Waste to Landfill per Batch' },
      { value: 'Net-Zero', label: 'By 2070 Target Supported' },
    ],
  },
  testParameters: [
    { property: 'Density / Specific Gravity', standard: 'ASTM D-1298' },
    { property: 'ASTM Color Evaluation', standard: 'ASTM D-1500' },
    { property: 'Viscosity Index (VI)', standard: 'ASTM D-2270' },
    { property: 'Kinematic Viscosity', standard: 'ASTM D-445' },
    { property: 'Flash Point (COC)', standard: 'ASTM D-92' },
    { property: 'Pour Point', standard: 'ASTM D-97' },
    { property: 'Water Content', standard: 'ASTM D-6304' },
    { property: 'Total Acid Number (Potentiometric)', standard: 'ASTM D-664' },
    { property: 'Total Acid Number (Color-Indicator)', standard: 'ASTM D-974' },
  ],
  environmentalImpact: [
    { value: '1 Litre', label: 'of recycled base oil saves 1.5 kg of CO2 vs virgin production' },
    { value: '100%', label: 'of feedstock converted to useful products' },
    { value: '0', label: 'hazardous waste sent to landfills' },
    { value: 'EPR', label: 'Compliant Facility Registration' },
  ],
}

export const industriesPage = {
  pageHeader: {
    title: 'Industries',
    titleAccent: 'We Serve',
    subtitle: 'Delivering Performance. Powering Industries. Your Growth, Our Commitment.',
  },
  industries: [
    {
      title: 'Lubricant Manufacturers',
      description:
        'Supplying premium SN-150 and SN-300 equivalent base oils with exceptional purity and a brilliant golden finish (ASTM color 1 to 2) for formulating top-tier automotive engine oils and industrial lubricants.',
    },
    {
      title: 'Hydraulic Oil Blenders',
      description:
        'Our straight-cut base oils provide the naturally high viscosity index (VI) and excellent oxidation stability required for long-life, heavy-duty hydraulic fluids.',
    },
    {
      title: 'Gear Oil Producers',
      description:
        'Engineered for superior film strength and heavy load-carrying capacity, our highly refined base oil serves as the perfect foundation for specialized industrial and automotive gear oils.',
    },
    {
      title: 'Boiler & Furnace Industries',
      description:
        'Our completely dehydrated Industrial LDO delivers maximum thermal efficiency and an exceptionally high calorific value, making it the ideal economical fuel for industrial furnaces, boilers, and thermic fluid heaters.',
    },
    {
      title: 'Road Construction',
      description:
        'Rescuing the heaviest hydrocarbon chains allows us to produce a highly viscous, thermally stable asphalt modifier, providing a rugged foundation for high-performance asphalt blending and durable road networks.',
    },
    {
      title: 'Waterproofing & Coatings',
      description:
        'Completely free of water and highly stable, our dense bitumen residue acts as an excellent binding agent for roofing felts, industrial waterproofing compounds, and heavy-duty sealants.',
    },
    {
      title: 'Heavy Engineering & Forging',
      description:
        'Powering high-temperature operations and heavy forging plants with our reliable, low-moisture LDO alternative, ensuring consistent performance even in extreme industrial conditions.',
    },
    {
      title: 'Infrastructure Sector',
      description:
        'Supporting the backbone of modern infrastructure with our closed-loop asphalt products, ensuring structural integrity while helping organizations meet their Extended Producer Responsibility (EPR) sustainability targets.',
    },
    {
      title: 'Industrial Manufacturing',
      description:
        'Delivering cost-effective, zero-waste solutions for diverse industrial needs—from versatile cutting and spindle oils to sustainable, high-energy heating fuels.',
    },
  ],
  cta: {
    title: 'Ready to Partner with Orion Oil?',
    description:
      'Join leading Indian manufacturers who trust Orion Oil for their base oil and industrial fuel requirements. Experience the difference of domestic quality and reliability.',
  },
}

export const contactPage = {
  pageHeader: {
    title: 'Contact',
    titleAccent: 'Us',
    subtitle: 'Get in touch with Orion Oil',
  },
  getInTouch: {
    title: 'Get In Touch',
    address: 'S-32, MIDC Bhosari, Pune 411026, Maharashtra, INDIA',
    email: 'orionoilandgas@gmail.com',
    phone: '+91 8275635579',
  },
  dispatchOptions: [
    'Available in 210 Liter MS/HDPE Drums',
    '1000 Liter IBC Tanks',
    'Bulk Road Tanker Dispatch',
  ],
}

export const quoteForm = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, gridSpan: 1 },
    { name: 'company', label: 'Company Name', type: 'text', required: true, gridSpan: 1 },
    { name: 'countryCode', label: 'Country Code', type: 'select', required: false, gridSpan: 1 },
    { name: 'phone', label: 'Contact No', type: 'tel', required: true, gridSpan: 1 },
    { name: 'email', label: 'Email ID', type: 'email', required: true, gridSpan: 1 },
    { name: 'gst', label: 'GST No', type: 'text', required: false, gridSpan: 1 },
    { name: 'requirement', label: 'Requirement', type: 'select', required: true, gridSpan: 2, fullWidth: true },
    { name: 'message', label: 'More Information', type: 'textarea', required: false, gridSpan: 2, fullWidth: true },
  ],
  countryCodes: [
    { value: '+91', label: '+91 (India)' },
    { value: '+1', label: '+1 (USA)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+971', label: '+971 (UAE)' },
    { value: '+65', label: '+65 (Singapore)' },
    { value: '+60', label: '+60 (Malaysia)' },
    { value: '+66', label: '+66 (Thailand)' },
    { value: '+880', label: '+880 (Bangladesh)' },
    { value: '+94', label: '+94 (Sri Lanka)' },
    { value: '+977', label: '+977 (Nepal)' },
  ],
  requirementOptions: [
    { value: 'Base Oil SN150', label: 'Base Oil SN-150' },
    { value: 'Base Oil SN300', label: 'Base Oil SN-300' },
    { value: 'Bitumen', label: 'Bitumen / Asphalt Modifier' },
    { value: 'LDO', label: 'Industrial LDO' },
  ],
}

export const footer = {
  brand: 'Engineering the future of sustainable lubricants. Premium base oils and industrial fuels, proudly refined in Pune, Maharashtra.',
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Technology', href: '/technology' },
    { label: 'Quality', href: '/quality' },
    { label: 'Industries', href: '/industries' },
    { label: 'Contact Us', href: '/contact' },
  ],
  getInTouch: [
    { label: 'Contact Sales', action: 'contact' },
    { label: 'Request for Bulk Quote', action: 'quote' },
    { label: 'WhatsApp', action: 'whatsapp' },
  ],
  copyright: `© ${new Date().getFullYear()} Orion Oil and Gas. All Rights Reserved.`,
}
