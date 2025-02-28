
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateInvestmentReturn(
  principal: number,
  rate: number,
  startDate: string,
  endDate: string
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const durationInYears = durationInDays / 365;
  
  // Using compound interest formula: A = P(1 + r/100)^t
  const finalAmount = principal * Math.pow(1 + rate / 100, durationInYears);
  return Number(finalAmount.toFixed(2));
}

export function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function getPercentComplete(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  if (today < start) return 0;
  if (today > end) return 100;
  
  const totalDuration = end.getTime() - start.getTime();
  const elapsedDuration = today.getTime() - start.getTime();
  
  return Math.round((elapsedDuration / totalDuration) * 100);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
