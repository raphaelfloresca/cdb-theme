import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { Button } from "@/src/components/ui/button"
import { RichText, useBlockProps } from "@wordpress/block-editor"
import { Flex, FlexBlock, FlexItem } from "@wordpress/components"

// Define an interface for the attributes your block uses
interface BlockAttributes {
  [key: string]: any;
}

// Define an interface for the component's props
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
  const blockProps = useBlockProps()

  function deleteAccordionTrigger(indexToDelete: number) {
    const newTriggers = attributes.accordionTriggers.filter(function(x: any, index: number) {
      return index != indexToDelete
    })
    setAttributes({ ...attributes, accordionTriggers: newTriggers })
  }

  return (
    <div {...blockProps}>
      <Accordion type="single" collapsible className="w-full">
        {attributes.accordionTriggers.map(function(trigger: string, index: number) {
          attributes.accordionContents.concat([""])

          return (
            <AccordionItem value={`item-${index + 1}`}>
              <Flex>
                <FlexBlock>
                  <AccordionTrigger>
                    <RichText
                      tagName="h3"
                      value={trigger} // Any existing content, either from the database or an attribute default
                      onChange={(newTrigger) => {
                        const newTriggers = [...attributes.accordionTriggers]
                        newTriggers[index] = newTrigger
                        setAttributes({ ...attributes, accordionTriggers: newTriggers })
                      }} // Store updated content as a block attribute
                      placeholder='Enter a trigger...' // Display this text before any content has been added by the user
                      onKeyUp={(event) => {
                        event.stopPropagation()
                        event.preventDefault()
                      }}
                    />
                  </AccordionTrigger>
                </FlexBlock>
                <FlexItem>
                  <Button onClick={() => { deleteAccordionTrigger(index) }}>Delete accordion item</Button>
                </FlexItem>
              </Flex>
              <AccordionContent>
                <RichText
                  tagName="p"
                  value={attributes.accordionContents[index]} // Any existing content, either from the database or an attribute default
                  onChange={(newContent) => {
                    const newContents = [...attributes.accordionContents]
                    newContents[index] = newContent
                    setAttributes({ ...attributes, accordionContents: newContents })
                  }} // Store updated content as a block attribute
                  placeholder='Enter content...' // Display this text before any content has been added by the user
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Button onClick={() => {
        setAttributes({ ...attributes, accordionTriggers: attributes.accordionTriggers.concat([""]) })
      }}>Add a new accordion item
      </Button>
    </div>
  );
}
