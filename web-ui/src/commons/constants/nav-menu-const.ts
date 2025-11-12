import {
  Coffee,
  LayoutDashboard,
  List,
  LucideProps,
  Pizza,
  ShoppingCart,
  Table,
} from "lucide-react";

export const NAVIGATION_MENU: TNavigationMenu[] = [
  {
    title: "Operations",
    data: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
        items: null,
      },
      {
        label: "Menu",
        icon: Pizza,
        href: "/admin/dashboard/menu",
        items: [
          {
            href: "/admin/dashboard/menu/category",
            label: "Categories",
            icon: List,
          },
          {
            href: "/admin/dashboard/menu/items",
            label: "Menu Items",
            icon: Coffee,
          },
        ],
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
        href: "/admin/orders",
        items: [
          {
            href: "/admin/orders/pending",
            label: "Pending Orders",
            icon: ShoppingCart,
          },
          {
            href: "/admin/orders/completed",
            label: "Completed Orders",
            icon: ShoppingCart,
          },
        ],
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
