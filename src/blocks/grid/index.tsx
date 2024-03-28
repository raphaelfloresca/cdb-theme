import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata, {
  icon: "smiley",
  edit: Edit,
  save: Save
});
