const TOKEN_TEMPLATE = "#{$0}";

function replaceTemplateToken(template: string, token: string, value: string) {
	return template.replaceAll(TOKEN_TEMPLATE.replace("$0", token), value);
}

export function replaceTemplateTokens(template: string, tokens: { [key: string]: string }) {
	return Object.keys(tokens).reduce((acc, key) => replaceTemplateToken(acc, key, tokens[key]), template);
}