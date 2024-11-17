export interface AuthContextType {
    user: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    signup: (userData: UserRequestDto) => Promise<void>
    getUserDetails: (id: number) => Promise<UserResponsetDto | null>
    getListUsers: () => Promise<UserListResponseDto[] | null>
    deleteUser: (id: number) => Promise<void>
    updateUserDetails: (id: number, userData: UserDetailsRequestDto) => Promise<void>
    updateSelfUserDetails: (userData: UserRequestDto) => Promise<void>
    getSelfUserDetails: () => Promise<UserResponsetDto | null>
  }
  
  export interface UserRequestDto {
    name: string
    password: string
    firstName: string
    secondName: string
    email: string
    phone: string
    is_notification_email: boolean
  }
  
  export interface UserResponsetDto {
    id: number
    id_details: number
    name: string
    firstName: string
    secondName: string
    email: string
    phone: string
    role: string
    category: string
    group: string
    is_notification_email: boolean
  }
  
  export interface UserDetailsRequestDto {
    password: string
    name: string
    firstName: string
    secondName: string
    email: string
    phone: string
    role: string
    category: string
    group: string
    is_notification_email: boolean
  }
  
  export interface UserListResponseDto {
    id: number
    username: string
    email: string
    accountNonExpired: boolean
    accountNonLocked: boolean
    credentialsNonExpired: boolean
    enabled: boolean
    roles: RoleDto[]
  }
  
  export interface RoleDto {
    name: string
    permissions: PermissionDto[]
  }
  
  export interface PermissionDto {
    permission: string
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    roles: Role[];
    lastLogin: string;
  }
  
  export interface Role {
    name: string;
    permissions: Permission[];
  }
  
  export interface Permission {
    permission: string;
  }

  export interface FormData {
    name: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    secondName: string;
    email: string;
    phone: string;
    is_notification_email: boolean;
  }