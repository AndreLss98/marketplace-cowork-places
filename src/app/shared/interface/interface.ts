export interface LoginResponse {
    status: boolean;
    data: any
}

export interface User {
    registration: {
        applicationId: string,
        data: Object,
        username: string
    },
    user: {
        birthDate: string,
        data: object,
        email: string,
        firstName: string,
        fullName: string,
        lastName: string,
        mobilePhone: string,
        password: string,
        username: string
    }
}

export interface highlightItem {
    local: string,
    description: string,
    image: string,
    cost: number,
    tax: number,
    rank: number,
    id: number,
}