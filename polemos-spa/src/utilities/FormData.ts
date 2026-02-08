export function getFormDataOrDefault(data: FormData, key: string): string {
    return data.get(key)?.toString() ?? '';
}
