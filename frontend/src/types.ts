interface Option {
    id: number,
    name: string
}

interface Vote {
    id: number,
    date: Date,
    option: Option
}

export interface Survey {
    id?: number,
    name?: string,
    votes?: Array<Vote>,
    options?: Array<Option>,
    endDate?: Date,
    description?: string,
    photo?: string,
    color?: string
}

export interface FormInputField {
    classNames?: string;
    validity?: boolean;
}