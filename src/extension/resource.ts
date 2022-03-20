import {Uri} from 'vscode';

export class ResourceResolver {
	constructor(private readonly extensionUri: Uri) {}

	getResourceUri(...pathSegments: readonly string[]) {
		return Uri.joinPath(this.extensionUri, 'resources', ...pathSegments);
	}
}
