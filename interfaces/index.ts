export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    is_active: boolean;
    profile_picture: string;
    created_at: string;
}

export interface IHotel {
  id: number;
  created_at: string;
  name: string | null;
  description: string | null;
  city: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  images: string[] | null;
  status: string | null;
  owner_id: number | null;
  amenities: string[] | null;
  starting_rent: number | null;
}

export type IHotelCreate = Omit<IHotel, 'id' | 'created_at'>;
export type IHotelUpdate = Partial<IHotelCreate>;

export interface IRoom {
  id: number;
  created_at: string;
  hotel_id: number | null;
  owner_id: number | null;
  name: string | null;
  description: string | null;
  type: string | null;
  rent_per_day: number | null;
  status: string | null;
  amenities: string[] | null;
  images: string[] | null;
}

export type IRoomCreate = Omit<IRoom, 'id' | 'created_at'>;
export type IRoomUpdate = Partial<IRoomCreate>;