import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { Button } from "@wordpress/components"
import { RichText } from "@wordpress/block-editor"

// Define an interface for the attributes your block uses
interface BlockAttributes {
  accordionTriggers: string[],
  accordionContents: string[],
}

// Define an interface for the component's props
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
}

export default function Edit({ attributes, setAttributes }: EditProps) {

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {attributes.accordionTriggers.map(function(trigger, index) {
          attributes.accordionContents.concat([""])

          return (
            <AccordionItem value={`item-${index + 1}`}>
              <AccordionTrigger>
                <RichText
                  value={trigger} // Any existing content, either from the database or an attribute default
                  onChange={(newTrigger) => {
                    const newTriggers = attributes.accordionTriggers.concat([])
                    newTriggers[index] = newTrigger
                    setAttributes({ accordionTriggers: newTriggers })
                  }} // Store updated content as a block attribute
                  placeholder='Enter a trigger...' // Display this text before any content has been added by the user
                />
              </AccordionTrigger>
              <AccordionContent>
                <RichText
                  tagName="p"
                  value={attributes.accordionContents[index]} // Any existing content, either from the database or an attribute default
                  allowedFormats={['core/bold', 'core/italic']}
                  onChange={(newContent) => {
                    const newContents = attributes.accordionContents.concat([])
                    newContents[index] = newContent
                    setAttributes({ accordionContents: newContents })
                  }} // Store updated content as a block attribute
                  placeholder='Enter content...' // Display this text before any content has been added by the user
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => {
        setAttributes({ accordionTriggers: attributes.accordionTriggers.concat([""]) })
      }}>Add a new accordion item</Button>
    </>
  );
}
