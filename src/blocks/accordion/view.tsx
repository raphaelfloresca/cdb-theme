import { createRoot } from 'react-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"

const divsToUpdate = document.querySelectorAll(".accordion-container")

divsToUpdate.forEach(function(div) {
  let root = createRoot(div)
  root.render(<CDBAccordion />)
})

function CDBAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Test
        </AccordionTrigger>
        <AccordionContent>
          Test
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
