const faqs = [
  {
    question: "How can I start learning English on this website?",
    answer:
      "You can start by exploring our beginner lessons, interactive exercises, and quizzes. We also offer structured courses to guide you step by step.",
    defaultOpen: true,
  },
  {
    question: "Is this website free to use?",
    answer: "Yes, learning is totally free.",
  },
  {
    question: "Do I need to create an account?",
    answer: "You can create an accout to save your progress.",
  },
  {
    question: "How can I build my English vocabulary?",
    answer: "Learn new words everyday.",
  },
  {
    question: "Do you offer certificates for completed courses?",
    answer: "No, certification is not available right now.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="w-4/5 mx-auto mb-20">
      <h2 className="text-4xl font-bold text-center mb-20">
        <span className="text-[#00BCFF]">Frequently</span> Asked Questions
      </h2>
      <div className="space-y-5">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="collapse collapse-plus bg-base-200 border border-base-300"
          >
            <input
              type="radio"
              name="my-accordion-3"
              defaultChecked={faq.defaultOpen}
            />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
