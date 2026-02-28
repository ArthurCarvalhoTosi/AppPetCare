// ===== ENUMS =====

export enum UserType {
  PetOwner = 0,
  Caregiver = 1,
}

export enum PetType {
  Dog = 0,
  Cat = 1,
  Bird = 2,
  Fish = 3,
  Rodent = 4,
  Reptile = 5,
  Other = 99,
}

export enum VisitStatus {
  Pending = 0,
  Confirmed = 1,
  InProgress = 2,
  Completed = 3,
  Cancelled = 4,
}

// ===== INTERFACES =====

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  profileImageUrl?: string
  userType: UserType
  createdAt: string
}

export interface Pet {
  id: string
  ownerId: string
  name: string
  type: PetType
  breed?: string
  ageInMonths?: number
  description?: string
  imageUrl?: string
  specialNeeds?: string
}

export interface CaregiverProfile {
  id: string
  userId: string
  user?: User
  bio: string
  hourlyRate: number
  serviceArea?: string
  isAvailable: boolean
  rating: number
  totalReviews: number
  acceptedPetTypes: PetType[]
}

export interface Visit {
  id: string
  petId: string
  pet?: Pet
  caregiverId: string
  caregiver?: CaregiverProfile
  ownerId: string
  owner?: User
  scheduledDate: string
  startTime: string
  endTime: string
  status: VisitStatus
  notes?: string
  address?: string
  totalPrice?: number
}

export interface VisitReport {
  id: string
  visitId: string
  caregiverId: string
  content: string
  createdAt: string
  images: ReportImage[]
}

export interface ReportImage {
  id: string
  reportId: string
  imageUrl: string
  caption?: string
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  visitId?: string
  content: string
  isRead: boolean
  sentAt: string
  readAt?: string
}

export interface Conversation {
  id: string
  user1Id: string
  user2Id: string
  otherUser?: User
  lastMessage?: ChatMessage
  unreadCount: number
}

export interface Availability {
  id: string
  caregiverId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isRecurring: boolean
  specificDate?: string
  isBlocked: boolean
}

// ===== API RESPONSES =====

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

// ===== CALENDAR EVENTS =====

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource?: Visit
}
