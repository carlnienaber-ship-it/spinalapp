export enum Screen {
  Welcome,
  OpeningTasks,
  OpeningStocktake,
  Motivational,
  NewStockDelivery,
  ClosingStocktake,
  ClosingTasks,
  Summary,
}

export interface User {
  name: string;
  email: string;
  picture?: string;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  type: 'toggle' | 'radio';
  options?: string[];
  selectedValue?: string;
  notes?: string;
  isOptional?: boolean;
}

export interface SpiritItem {
  name: string;
  frontOfHouse?: number;
  storeRoom?: number;
  weight?: number;
}

export interface StockItem {
  name:string;
  frontOfHouse?: number;
  storeRoom?: number;
}

export interface FoodItem {
    name: string;
    quantity?: number;
}

export interface StockData {
  spirits: SpiritItem[];
  cansAndBottles: StockItem[];
  food: FoodItem[];
  brewersReserve: StockItem[];
}

export interface NewStockDelivery {
    id: string;
    productName: string;
    quantity: number;
}