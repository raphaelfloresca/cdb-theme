import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'
import { PanelBody, SelectControl } from '@wordpress/components';

// Define an interface for the attributes your block uses
interface BlockAttributes {
  // example attribute
  numberOfColumns: string;
}

// Define an interface for the component's props
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
  type BlockProps = {
    className?: string;
  };

  // Dynamic class string based on attribute
  const gridClass = `grid grid-cols-none md:grid-cols-${attributes.numberOfColumns} gap-4`;

  const blockProps: BlockProps = useBlockProps({ className: gridClass })
  const innerBlocksProps = useInnerBlocksProps(blockProps)

  return (
    <>
      <InspectorControls>
        <PanelBody title='Settings'>
          <SelectControl
            label="Number of Columns"
            value={attributes.numberOfColumns}
            options={[
              { label: 'None', value: 'none' },
              { label: '1 Column', value: '1' },
              { label: '2 Columns', value: '2' },
              { label: '3 Columns', value: '3' },
              { label: '4 Columns', value: '4' },
              { label: '5 Columns', value: '5' },
              { label: '6 Columns', value: '6' },
              { label: '7 Columns', value: '7' },
              { label: '8 Columns', value: '8' },
              { label: '9 Columns', value: '9' },
              { label: '10 Columns', value: '10' },
              { label: '11 Columns', value: '11' },
              { label: '12 Columns', value: '12' }
            ]}
            onChange={(selectedOption) => setAttributes({ numberOfColumns: selectedOption })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps} />
    </>
  );
}
