
export interface itemShop {
  id: any;
  category_id: string;
  daily_shop_item_id: any;
  date: any;
  name: string;
  price: number;
  quantity: number;
  status: any;
  unit_type: string;
}

export interface RecapDetailCategoryShop {
  name: string;
  quantity: string;
  unit_type: string;
  price: string;
  category: string;
}

export interface RecapDetailCategoryShop {
  name: string;
  quantity: string;
  unit_type: string;
  price: string;
  category: string;
}

export interface RecapDetailPriceShop {
  currentbalance: number;
  gross_profit: number;
  nett_profit: number;
  prevbalance: number;
  shop_expense: number;
  laukPaukTotalPrice: number;
  bumbuSayuranTotalPrice: number;
  sembakoMinumanTotalPrice: number;
  lainLainTotalPrice: number;
}
