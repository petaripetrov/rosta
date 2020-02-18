export interface Option {
    id?: number,
    name: string
}

export interface Vote {
    id?: number,
    date: string,
    optionId: number | undefined
}

export interface Survey {
    id?: number,
    name?: string,
    votes?: Array<Vote>,
    options?: Array<Option>,
    endDate?: String,
    description?: string,
    photo?: string,
    color?: string
}

export interface FormInputField {
    classNames?: string;
    validity?: boolean;
}