export type Role = "SUPER_ADMIN" | "OWNER" | "MANAGER" | "ADMIN" | "CUSTOMER";

export type Currency = "IDR" | "USD";

export type Company = {
  id: string;
  name: string;
  avatarUrl?: string;
  type?: string;
  branches?: number;
};

export type Product = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  companyId: string;
};

export type AiInsight = {
  id: string;
  companyId: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
};