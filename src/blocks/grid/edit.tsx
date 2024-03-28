import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'

export default function Edit() {
  type BlockProps = {
    className?: string;
  };

  const blockProps: BlockProps = useBlockProps({ className: 'grid grid-cols-4 gap-4' })
  const innerBlocksProps = useInnerBlocksProps(blockProps)

  return (
    <div {...innerBlocksProps} />
  );
}
