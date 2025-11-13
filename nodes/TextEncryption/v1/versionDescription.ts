/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { type INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Text Encryption',
	name: 'textEncryption',
	group: ['input'],
	version: 1,
	icon: 'file:../../icons/textEncryption.svg',
    description: 'Basic Text Encryption Node',
    defaultVersion: 1,
	defaults: {
		name: 'Text Encryption'
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'textEncryptionApi',
			required: true,
		}
	],
	properties: [
		{
			displayName: 'Encryption Key',
			name: 'encryptionKey',
			type: 'credentials',
			default: 'encryptionKey',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Encrypt',
					value: 'encrypt',
					action: 'Encrypt a string',
					description: 'Encrypt a string'
				},
				{
					name: 'Decrypt',
					value: 'decrypt',
					action: 'Decrypt a string',
					description: 'Decrypt a string'
				}
			],
			default: 'encrypt'
		},
		{
			displayName: 'Input String',
			name: 'input',
			type: 'string',
			default: '',
			placeholder: 'Text to be encrypted',
			description: 'String to be encrypted',
			displayOptions: {
				show: {
					operation: ['encrypt']
				}
			}
		},
		{
			displayName: 'Input String',
			name: 'input',
			type: 'string',
			default: '',
			placeholder: 'Text to be decrypted',
			description: 'String to be decrypted',
			displayOptions: {
				show: {
					operation: ['decrypt']
				}
			}
		}
	]
};
