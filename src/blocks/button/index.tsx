import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,
  icon: "smiley",
  edit: Edit,
  save: Save,
  attributes: {
    noOfButtonClicks: {
      type: "number",
      default: 300,
    },
  }
});
