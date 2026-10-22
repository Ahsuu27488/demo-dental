// All copy and sample data for the Fernwick Dental demo.
// Fernwick Dental is FICTIONAL. Every price, hour and number here is sample
// content for a portfolio demo. Phone numbers use the reserved 555-01xx range.
// Never add testimonials, ratings, reviews, awards, insurer logos or patient photos.

export const site = {
  name: "Fernwick Dental",
  city: "Portland, Oregon",
  url: "https://demo-dental.vercel.app",
  title: "Fernwick Dental, Portland | Demo website",
  description:
    "Demo website for Fernwick Dental, a fictional family dental clinic in downtown Portland, Oregon. Built by Muhammad Ahsan.",
  demoNote: "Demo website for a fictional clinic, built by Muhammad Ahsan",
  builderUrl: "https://ahsandev.site",
  builderLabel: "ahsandev.site",
};

export const contact = {
  phoneDisplay: "(503) 555-0142",
  phoneHref: "tel:+15035550142",
  whatsappHref:
    "https://wa.me/15035550142?text=" +
    encodeURIComponent("Hi Fernwick Dental, I'd like to book a visit."),
  email: "hello@fernwick.example",
  area: "Downtown Portland, a short walk from Pioneer Courthouse Square",
  addressNote: "Fictional clinic: there is no real address.",
  // OpenStreetMap embed centred on Pioneer Courthouse Square (a public landmark).
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-122.6830%2C45.5163%2C-122.6760%2C45.5212&layer=mapnik&marker=45.51887%2C-122.67946",
  mapLink: "https://www.openstreetmap.org/?mlat=45.51887&mlon=-122.67946#map=17/45.51887/-122.67946",
};

export const nav = [
  { id: "prices", label: "Prices" },
  { id: "visit", label: "Your visit" },
  { id: "book", label: "Book" },
  { id: "find-us", label: "Hours" },
  { id: "faq", label: "FAQ" },
];

export const hero = {
  headline: "Fernwick Dental",
  sub: "A calm family dental clinic in downtown Portland. Check-ups from $120, and the price is written down before any work starts.",
  cta: "Book a visit",
  // The five folders in the hero stack, back to front. Each links to a section.
  folders: [
    { id: "faq", label: "FAQ" },
    { id: "find-us", label: "Hours" },
    { id: "visit", label: "Your visit" },
    { id: "prices", label: "Prices" },
    { id: "book", label: "Book a visit" },
  ],
};

// "Why us" statement: one paragraph, each clause followed by an inline photo slot.
export const why = {
  heading: "Why Fernwick",
  parts: [
    { text: "One family in the clinic at a time,", image: "moss-trail" },
    { text: "every X-ray explained on a screen you can read,", image: "leaf-rain" },
    { text: "and the price in writing before we begin.", image: "fog-bridge" },
  ],
  support:
    "Appointments run on time because we book 60 minutes for a check-up, not 20. Evenings on Tuesday and Thursday, Saturday mornings too.",
};

export type Service = {
  id: string;
  name: string;
  from: number; // starting price in USD
  minutes: number; // typical chair time
};

export type PriceGroup = {
  id: string;
  name: string;
  summary: string;
  services: Service[];
};

export const prices: { heading: string; note: string; groups: PriceGroup[] } = {
  heading: "Services and prices",
  note: "Starting prices without insurance. Your exact price is written on your plan before treatment. Sample prices for this demo.",
  groups: [
    {
      id: "everyday",
      name: "Everyday care",
      summary: "From $85",
      services: [
        { id: "checkup", name: "Check-up and cleaning", from: 120, minutes: 60 },
        { id: "kids", name: "Children's check-up (under 12)", from: 85, minutes: 40 },
        { id: "xrays", name: "Digital X-rays", from: 45, minutes: 15 },
        { id: "emergency", name: "Same-day emergency exam", from: 95, minutes: 30 },
      ],
    },
    {
      id: "repairs",
      name: "Repairs",
      summary: "From $160",
      services: [
        { id: "filling", name: "Tooth-coloured filling", from: 160, minutes: 45 },
        { id: "deep-clean", name: "Deep cleaning (per quarter)", from: 210, minutes: 60 },
        { id: "root-canal", name: "Root canal (front tooth)", from: 890, minutes: 90 },
        { id: "crown", name: "Porcelain crown", from: 1150, minutes: 90 },
        { id: "extraction", name: "Simple extraction", from: 180, minutes: 45 },
      ],
    },
    {
      id: "bigger",
      name: "Bigger plans",
      summary: "From $395",
      services: [
        { id: "whitening", name: "In-clinic whitening", from: 395, minutes: 90 },
        { id: "night-guard", name: "Custom night guard", from: 420, minutes: 30 },
        { id: "aligners", name: "Clear aligners (full course)", from: 3900, minutes: 60 },
        { id: "implant", name: "Single implant with crown", from: 3400, minutes: 120 },
        { id: "veneer", name: "Porcelain veneer (per tooth)", from: 1100, minutes: 90 },
        { id: "consult", name: "Free first talk about bigger work", from: 0, minutes: 30 },
      ],
    },
  ],
};

export const allServices: Service[] = prices.groups.flatMap((g) => g.services);

export const visit = {
  heading: "How a visit works",
  intro:
    "Most visits take an hour. Nobody touches a tool until you know what we are looking for and why.",
  steps: [
    {
      name: "Talk",
      text: "Ten minutes in a chair that does not tilt. Tell us what hurts, what scares you and what you want.",
    },
    {
      name: "Look",
      text: "Exam, gentle cleaning and X-rays if you need them, shown on the screen beside you as we go.",
    },
    {
      name: "Plan",
      text: "You leave with a written plan: what to do now, what can wait, and the price of each step.",
    },
  ],
};

export const booking = {
  heading: "Book a visit",
  sub: "Pick a service and a day. We call or text back within one working day to confirm a time.",
  fields: {
    name: "Your name",
    phone: "Phone number",
    service: "What do you need?",
    day: "Preferred day",
  },
  submit: "Request this visit",
  demoNotice: "This is a demo form: nothing is sent anywhere.",
  success: {
    title: "Request noted",
    text: "In a real clinic we would call you within one working day. On this demo, nothing was sent.",
    again: "Book another",
  },
};

export const hours = {
  heading: "Hours and where to find us",
  rows: [
    { day: "Monday", time: "8:00 am – 5:00 pm" },
    { day: "Tuesday", time: "8:00 am – 7:00 pm" },
    { day: "Wednesday", time: "8:00 am – 5:00 pm" },
    { day: "Thursday", time: "10:00 am – 7:00 pm" },
    { day: "Friday", time: "8:00 am – 3:00 pm" },
    { day: "Saturday", time: "9:00 am – 1:00 pm" },
    { day: "Sunday", time: "Closed" },
  ],
  emergency: "Toothache out of hours? Call and leave a message: we return emergency calls from 7:30 am.",
};

export const faq = {
  heading: "Questions",
  items: [
    {
      topic: "Insurance",
      q: "Do you take my insurance?",
      a: "We work with most PPO dental plans and file the claim for you. Bring your card and we check your cover before the visit, so there are no surprises.",
    },
    {
      topic: "Nerves",
      q: "I am scared of the dentist. Can you help?",
      a: "Say so when you book. We start with the talk, agree a stop signal, and you can take a break at any time. Numbing gel goes on before any injection.",
    },
    {
      topic: "Emergencies",
      q: "Can I be seen today for a toothache?",
      a: "We keep two emergency slots open every weekday. Call before 10 am and we will usually see you the same day.",
    },
    {
      topic: "Children",
      q: "From what age do you see children?",
      a: "From the first tooth. Short, playful visits for little ones, and parents can stay in the room.",
    },
    {
      topic: "Payment",
      q: "Can I spread the cost of bigger work?",
      a: "Yes. Plans over $1,000 can be split into monthly payments with no interest over 12 months. It is written into your plan.",
    },
    {
      topic: "Parking",
      q: "Where do I park?",
      a: "Several public garages are within two blocks, and MAX light rail stops at Pioneer Courthouse Square.",
    },
  ],
};

export const footer = {
  links: [
    { href: "#prices", label: "Prices" },
    { href: "#visit", label: "Your visit" },
    { href: "#book", label: "Book a visit" },
    { href: "#find-us", label: "Hours" },
    { href: "#faq", label: "FAQ" },
  ],
};

// Photographs: Unsplash licence, served by picsum.photos, stored in /public/img.
// They show the Pacific Northwest around the clinic, never the clinic, staff or patients.
export const photos = {
  "moss-trail": { src: "/img/moss-trail.jpg", alt: "A narrow trail through mossy green woodland", credit: "Paul Jarvis" },
  "leaf-rain": { src: "/img/leaf-rain.jpg", alt: "Rain drops on a broad green leaf", credit: "Buzo Jesús" },
  "fog-bridge": { src: "/img/fog-bridge.jpg", alt: "A long bridge disappearing into grey fog", credit: "Liane Metzler" },
  "tall-trunks": { src: "/img/tall-trunks.jpg", alt: "Looking up tall tree trunks towards the forest canopy", credit: "Kim Daniel" },
  "cloud-hills": { src: "/img/cloud-hills.jpg", alt: "Low cloud drifting over dark green forested hills", credit: "Forrest Cavale" },
} as const;

export type PhotoId = keyof typeof photos;
