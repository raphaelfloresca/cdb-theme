import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: Save,
  attributes: {
    numberOfColumns: {
      type: 'string',
      default: '3'
    }
  }
});
