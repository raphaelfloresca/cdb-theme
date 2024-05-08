import { render } from 'react-dom'

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
    </div>
  );
}

