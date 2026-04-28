// Tipos compartilhados entre frontend e backend
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}