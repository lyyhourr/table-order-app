import {
  Coffee,
  LayoutDashboard,
  List,
  LucideProps,
  ShoppingCart,
  Table,
} from "lucide-react";

export const NAVIGATION_MENU: TNavigationMenu[] = [
  {
    title: "Menu",
    data: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
        items: null,
      },
      {
        label: "Categories",
        href: "/admin/dashboard/category",
        icon: List,
        items: null,
      },
      {
        label: "Menu Items",
        href: "/admin/dashboard/items",
        icon: Coffee,
        items: null,
      },
      {
        label: "Table",
        icon: Table,
        href: "/admin/dashboard/tables",
        items: null,
      },

      {
        label: "Orders",
        icon: ShoppingCart,
        href: "/admin/dashboard/orders",
        items: null,
      },
    ],
  },
];

type TNavigationItemChild = {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
};

type TNavigationItemParent = TNavigationItemChild & {
  items: TNavigationItemChild[] | null;
};

type TNavigationItem = TNavigationItemParent[];

type TNavigationMenu = {
  title: string;
  data: TNavigationItem;
};
