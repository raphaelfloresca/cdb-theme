import { render } from 'react-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { RichText } from "@wordpress/block-editor"

// Define an interface for the attributes your block uses
interface FrontendProps {
  accordionTriggers: string[],
  accordionContents: string[],
}

document.querySelectorAll(".accordion-block").forEach(div => {
  const accordionTriggers = JSON.parse(div.getAttribute('data-accordion-triggers') as string);
  const accordionContents = JSON.parse(div.getAttribute('data-accordion-contents') as string);

  render(<CDBAccordion accordionTriggers={accordionTriggers} accordionContents={accordionContents} />, div);
});

function CDBAccordion(props: FrontendProps) {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {props.accordionTriggers.map(function(trigger, index) {
          return (
            <AccordionItem value={`item-${index + 1}`}>
              <AccordionTrigger>
                <RichText.Content
                  value={trigger} // Any existing content, either from the database or an attribute default
                />
              </AccordionTrigger>
              <AccordionContent>
                <RichText.Content
                  value={props.accordionContents[index]} // Any existing content, either from the database or an attribute default
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}
