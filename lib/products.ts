export interface Product {
  id: string;
  name: string;
  description: string;
  brand_color: string;
  coinbase_managed_merchant: boolean;
  local_price: {
    amount: string;
    currency: string;
  };
  organization_name: string;
  pricing_type: string;
  requested_info: string[];
  resource: string;
}


export interface CoinbaseDataApiResponse {
  products: Product[];
}

export interface CoinbasePagination {
  order: string;
  starting_after: string | null;
  ending_before: string | null;
  total: number;
  limit: number;
  yielded: number;
  cursor_range: string[];
  previous_uri: string | null;
  next_uri: string | null;
}

export interface CoinbaseProductResponse {
  pagination: CoinbasePagination;
  data: Product[];
}
