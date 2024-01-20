export interface AuthResponse {
    user: User
    token: string
}

export interface User {
    id: number
    fullName: string
    phoneNumber: string
    role: string
    isAccountLocked: boolean
}