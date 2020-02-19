export interface Option {
    name: string
}

export interface Vote {
    id: number,
    date: Date,
    option: Option
}

export interface Survey {
    Name?: string,
    StartDate?: Date
    EndDate?: Date,
    Description?: string,
    PhotoPath?: string,
    Color?: string,
    Options?: Array<Option>
    
}

export interface FormInputField {
    classNames?: string;
    validity?: boolean;
}