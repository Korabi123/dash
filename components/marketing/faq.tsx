import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

export const Faq = () => {
  return (
    <div id="faq" className="py-36 border-b border-white/15 flex bg-[#0b0221] flex-col items-center relative justify-center gap-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center md:max-w-sm px-10 leading-[1.275] lg:text-5xl md:text-3xl text-2xl relative font-[365] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 z-10 text-white/60 text-center max-w-md font-[330] leading-[1.5] tracking-tight">
        Check out our frequently asked questions and get answers to your
        questions.
      </p>

      <div className="mt-20">
        <Accordion type="single" collapsible className="lg:min-w-[850px] lg:max-w-[850px] md:min-w-[450px] md:max-w-[450px] w-full p-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Dash, and how can it help me?</AccordionTrigger>
            <AccordionContent>
              Dash helps you track, organize, and analyze your income, expenses, and financial accounts, enabling better budgeting, investment planning, and decision-making.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is my financial data secure on this platform?</AccordionTrigger>
            <AccordionContent>
              Yes, we prioritize the security of your financial data. We use industry-standard encryption to protect your account and ensure that your data remains private and secure.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I track multiple accounts, such as savings, checking, and investments?</AccordionTrigger>
            <AccordionContent>
              Yes, our platform allows you to track multiple types of accounts, including checking, savings, credit cards, loans, and investment accounts, all in one place for a complete financial overview.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Does the platform offer reports or insights on my spending and saving habits?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We provide detailed insights that help you understand your spending patterns, savings progress, and overall financial health.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is it open-source?</AccordionTrigger>
            <AccordionContent>
              Yes, Dash is open-source, allowing you to access the source code and contribute to its development.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Can I use this platform for personal or business use?</AccordionTrigger>
            <AccordionContent>
              Yes, you can use our platform for personal or business use. It is designed to be flexible and customizable to meet your specific needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
