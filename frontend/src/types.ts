export interface OptionInput {
    name: string
}

export interface SurveyInput{
    Name?: string,
    StartDate?: Date
    EndDate?: Date,
    Description?: string,
    PhotoPath?: string,
    Color?: string,
    Options?: Array<OptionInput>
}

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

export interface CandidacyInput {
    name: string,
    description: string
}
export interface Candidacy{
    
}