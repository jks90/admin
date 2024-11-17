export interface Template {
    id: string;
    name: string;
    description: string;
    html: string;
}

export interface ApiTemplateResponse {
    data: Array<Array<Template>>;
    status: {
        message: string;
        code: number;
    };
}

export interface EmailList {
    id: string;
    name: string;
    subscribers: Array<{ email: string; id: string }>;
    lastUpdated: string;
}

export interface ApiEmailResponse {
    data: Array<Array<EmailList>>;
    status: {
        message: string;
        code: number;
    };
}

export interface EmailInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export interface MailRequestDto {
    procces: string;
    to: string;
}

export interface TemplateRequestDto {
    name: string;
    description: string;
    html: string;
}

export interface EmailListRequestDto {
    name: string;
    subscribers: Array<{ email: string }>;
}

export interface MailContextType {
    sendEmail: (emailData: MailRequestDto) => Promise<void>;

    getTemplates: () => Promise<Template[] | null>;

    createTemplate: (templateData: TemplateRequestDto) => Promise<void>;

    getEmailLists: () => Promise<EmailList[] | null>;

    createEmailList: (emailListData: EmailListRequestDto) => Promise<void>;

    getEmailListById: (listId: string) => Promise<EmailList | null>;

    updateEmailList: (listId: string, emailListData: EmailListRequestDto) => Promise<void>;

    deleteEmailList: (listId: string) => Promise<void>;
}