import type { ICredentialType, INodeProperties } from 'n8n-workflow';

// eslint-disable-next-line @n8n/community-nodes/credential-test-required
export class TextEncryptionApi implements ICredentialType {
	name = 'textEncryptionApi';

	displayName = 'Text Encryption API';
	documentationUrl = 'https://github.com/NetPlans/n8n-nodes-text-encryption/#credentials';

	icon: string = 'file:../icons/textEncryption.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Encryption Key',
			name: 'encryptionKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

}
