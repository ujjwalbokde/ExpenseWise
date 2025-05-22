// /types.ts or /src/types.ts

export interface Transaction {
  category: any;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}
