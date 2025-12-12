export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export enum UrgencyLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  UNKNOWN = 'Unknown'
}