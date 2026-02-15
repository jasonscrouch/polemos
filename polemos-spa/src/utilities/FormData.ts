class FormDataParser {
    
    private _formData: FormData;

    constructor(form: HTMLFormElement) {        
        this._formData = new FormData(form);
    }

    public getOrDefault(key: string): string {
        return this._formData.get(key)?.toString() ?? '';
    }
}

export function useFormDataParser(form: HTMLFormElement): FormDataParser {
    return new FormDataParser(form);
}
