import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'
import { useDispatch, select } from '@wordpress/data'
import { useState, useEffect } from '@wordpress/element'
import { Switch } from "@/src/components/ui/switch"

// Define an interface for the component's props
interface EditProps {
  clientId: string;
}

export default function Edit({ clientId }: EditProps) {
  const [sectionToggle, setSectionToggle] = useState(false)
  const blockProps = useBlockProps();

  // Specify the template for the inner blocks, correctly typing each entry
  const template: Array<[string, object, Array<[string, object]>]> = [
    ['core/group', {}, [['core/paragraph', {}]]], // First group block with a paragraph block inside
    ['core/group', {}, [['core/paragraph', {}]]]  // Second group block with a paragraph block inside
  ];

  // Use innerBlocksProps with the specified template
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template });
  const { updateBlockAttributes } = useDispatch('core/block-editor');

  // Retrieve inner blocks using useSelect
  let innerBlocks = select('core/block-editor').getBlocks(clientId)

  useEffect(() => {
    innerBlocks.forEach((block, index) => {
      if (index === 1) {
        updateBlockAttributes(block.clientId, { className: "" })
      } else {
        updateBlockAttributes(block.clientId, { className: "hidden" })
      }
      innerBlocks = select('core/block-editor').getBlocks(clientId)
    })
  }, [])

  useEffect(() => {
    innerBlocks.forEach((block) => {
      if (!block.attributes.className) {
        updateBlockAttributes(block.clientId, { className: "hidden" })
      } else {
        updateBlockAttributes(block.clientId, { className: "" })
      }
    })
  }, [sectionToggle])

  return (
    <div {...blockProps}>
      <Switch id="section-switch" checked={sectionToggle} onCheckedChange={() => setSectionToggle(!sectionToggle)} />
      <div {...innerBlocksProps} />
    </div>
  )
}
