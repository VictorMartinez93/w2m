export interface ConfirmationModal {
    title: string;
    body: string[];
    okButton: string;
    okColor?: string;
    cancelButton?: string;
    cancelColor?: string;
}

export interface ConfirmationModalResult {
    result: boolean;
}