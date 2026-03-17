import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ordering cakes, delivery, pickup, and more at Jessa Cakes.",
};

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our cakes on the 'Our Cakes' page, select the cake you like, choose your preferred size and flavor, then fill out the order form with your details. You can choose either pickup or delivery.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept cash payment only — either cash on pickup or cash on delivery.",
  },
  {
    question: "How far in advance should I order?",
    answer:
      "Most custom cakes require at least 2–3 days advance notice. Some ready-made items may be available for same-day pickup. Each product page shows the required lead time.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Yes! We offer delivery within Malandag, Malungon and nearby areas. A delivery fee applies and will be shown during checkout.",
  },
  {
    question: "Can I pick up my order instead?",
    answer:
      "Absolutely. You can choose pickup at our shop in Malandag, Malungon, Sarangani Province. No delivery fee applies for pickup orders.",
  },
  {
    question: "Can I request a custom design?",
    answer:
      "Yes, we love creating custom designs! Please include your design details in the special instructions when ordering, or contact us directly to discuss your vision.",
  },
  {
    question: "What sizes are available?",
    answer:
      "Sizes vary by product. We typically offer 1-layer, 2-layer, and 3-layer options. Some products also come in specific inch sizes (6\", 8\", 10\"). Check each product page for available sizes and pricing.",
  },
  {
    question: "What is your price range?",
    answer:
      "Our cakes range from ₱180 for small desserts and Valentine's treats to ₱3,000+ for large 3-layer formal/celebration cakes. Standard birthday cakes are typically ₱500–₱850.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Please contact us as soon as possible if you need to cancel. Orders that are already being prepared may not be eligible for cancellation.",
  },
  {
    question: "What are your business hours?",
    answer:
      "We are open Monday to Saturday, 8:00 AM to 6:00 PM. We are closed on Sundays. Orders placed outside business hours will be reviewed the next working day.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Common questions about our cakes and ordering process
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-border bg-white p-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
              <span>{faq.question}</span>
              <span className="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
