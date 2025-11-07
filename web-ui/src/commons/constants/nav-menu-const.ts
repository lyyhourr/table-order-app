import {
  BarChart3,
  Coffee,
  CreditCard,
  LayoutDashboard,
  List,
  LucideProps,
  Pizza,
  Settings,
  ShoppingCart,
  Users,
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

      {
        label: "Payments",
        icon: CreditCard,
        href: "/admin/payments",
        items: [
          {
            href: "/admin/payments/pending",
            label: "Pending Payments",
            icon: CreditCard,
          },
          {
            href: "/admin/payments/completed",
            label: "Completed Payments",
            icon: CreditCard,
          },
        ],
      },
    ],
  },

  {
    title: "Management",
    data: [
      {
        label: "Users",
        icon: Users,
        href: "/admin/users",
        items: null,
      },
      {
        label: "Reports",
        icon: BarChart3,
        href: "/admin/reports",
        items: [
          {
            href: "/admin/reports/sales",
            label: "Sales Report",
            icon: BarChart3,
          },
          {
            href: "/admin/reports/menu",
            label: "Menu Performance",
            icon: BarChart3,
          },
        ],
      },
      {
        label: "Settings",
        icon: Settings,
        href: "/admin/settings",
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
