import { useBlockProps } from "@wordpress/block-editor"

// Define an interface for the attributes your block uses
interface BlockAttributes {
  noOfButtonClicks: number
}

// Define an interface for the component's props
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
  const blockProps = useBlockProps()

  // Correctly handle the click event
  const handleClick = () => {
    setAttributes({ noOfButtonClicks: attributes.noOfButtonClicks + 1 })
  };

  return (
    <div {...blockProps}>
      <button onClick={handleClick}>Clicked {attributes.noOfButtonClicks} times</button>
    </div>
  );
}
