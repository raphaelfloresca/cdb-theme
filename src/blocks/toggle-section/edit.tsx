import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'
import { useDispatch, select } from '@wordpress/data'
import { useEffect } from '@wordpress/element'
import { Switch } from "@/src/components/ui/switch"

// Define an interface for the attributes your block uses
interface BlockAttributes {
  sectionToggle: boolean;
}

// Define an interface for the component's props
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
  clientId: string;
}

const Edit = ({ attributes, setAttributes, clientId }: EditProps) => {
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
      if (index === 0) {
        updateBlockAttributes(block.clientId, { className: "" })
      } else {
        updateBlockAttributes(block.clientId, { className: "hidden" })
      }
      innerBlocks = select('core/block-editor').getBlocks(clientId)
      console.log(innerBlocks)
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
  }, [attributes.sectionToggle])

  return (
    <div {...blockProps}>
      <Switch id="section-switch" checked={attributes.sectionToggle} onCheckedChange={() => setAttributes({ sectionToggle: !attributes.sectionToggle })} />
      <div {...innerBlocksProps} />
    </div>
  )
}

export default Edit
