export type TUserMenu = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: {
    id: number;
    name: string;
    description: string | null;
  };
  available: boolean;
  description: string | null;
};
