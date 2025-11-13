import {
	INodeType,
	INodeTypeBaseDescription,
	IVersionedNodeType,
	VersionedNodeType,
} from 'n8n-workflow';
import { TextEncryptionV1 } from './v1/TextEncryption.node';

export class TextEncryption extends VersionedNodeType {

	currentVersion = 1;

	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Text Encryption',
			name: 'textEncryption',
			icon: 'file:./textEncryption.svg',
			group: ['input'],
			subtitle: '={{$parameter["operation"]}}',
			description: 'Basic Text Encryption Node',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new TextEncryptionV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}

	getNodeType(version: number | undefined): INodeType {
			switch (version) {
					case 1: return new TextEncryptionV1(this.description);
					// extend for new versions here

					// return the latest version if no version is specified
					default: return this.getNodeType(this.currentVersion);
			}
	}


}
