import { Card } from "@/src/components/ui/card"
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'

export default function Edit() {
  type BlockProps = {
    className?: string;
  };

  const blockProps: BlockProps = useBlockProps({ className: 'm-1 p-6 border rounded-lg shadow flex-1' })
  const innerBlocksProps = useInnerBlocksProps(blockProps)

  return (
    <Card {...innerBlocksProps} />
  );
}
