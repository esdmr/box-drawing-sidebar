export default interface Types {
	outbound: {
		loaded: unknown;
		insertSnippet: {
			snippet: string;
		};
	};
	inbound: {
		onDidChangeActiveTextEditor: {
			isTextEditorActive: boolean;
		};
	};
}
