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
    id:number,
    name:string,
    date:Date,
    description:string,
    photoPath:string,
    ownerId:number,
    owner:UserDetails
}
export interface CandidacyVoteInput{
    candidacyId?:number
}
export interface UserDetails{
    id:number,
    user:object,
    userId:string,
    schoolId:number,
    school:object
}

// "id": 10,
// "name": "Dragan",
// "date": "2020-02-21T15:12:01.237509",
// "description": "Freehugs",
// "photoPath": "54c745f6-ea5f-47f0-884a-acd491afbe1a-profilePhoto-9",
// "ownerId": 7,
// "owner": {
//     "id": 7,
//     "user": null,
//     "userId": "54c745f6-ea5f-47f0-884a-acd491afbe1a",
//     "schoolId": 4,
//     "school": null
// 