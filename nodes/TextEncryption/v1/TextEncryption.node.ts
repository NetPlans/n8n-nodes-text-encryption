/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeTypeDescription,
	NodeOperationError,
	ICredentialDataDecryptedObject,
	INodeType,
	INodeTypeBaseDescription,
} from 'n8n-workflow';
// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports
import Cryptr from "cryptr";
import {versionDescription} from "./versionDescription";

// eslint-disable-next-line @n8n/community-nodes/icon-validation
export class TextEncryptionV1 implements INodeType {
    description: INodeTypeDescription;

    constructor(baseDescription: INodeTypeBaseDescription) {
        this.description = {
            ...baseDescription,
            ...versionDescription
        };
    }

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const result: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0, "encrypt") as "encrypt" | "decrypt" ;
		const credentials = await this.getCredentials('textEncryptionApi') as ICredentialDataDecryptedObject;

		const cryptr = new Cryptr(credentials.encryptionKey as string);

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

			try {
				const input = this.getNodeParameter('input', itemIndex, '') as string;

				if (input === "" || input === undefined) {
					throw new NodeOperationError(this.getNode(), "Input string is empty", {description: "TEST",itemIndex});
				}
				result.push({
					json: {
						result: cryptr[operation](input)
					},
					pairedItem: itemIndex
				});
			} catch (error) {
				if (this.continueOnFail()) {
					result.push({ json: { error: error.message }, pairedItem: {item: itemIndex }});
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}
		return [result];
	}
}
