interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItemsAdmin: NavData[] = [
  {
    title: true,
    name: 'Danh mục'
  },
  {
    name: 'Quản lý sản phẩm',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Danh sách sản phẩm',
        url: '/admin/product-management',
        icon: 'icon-puzzle'
      },
      {
        name: 'Thêm sản phẩm',
        url: '/admin/product',
        icon: 'icon-puzzle'
      }
    ]
  },
  // {
  //   name: 'Quản lý đơn hàng',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //   ]
  // }
];

export const navItemsSupperAdmin: NavData[] = [
  {
    title: true,
    name: 'Danh mục'
  },
  {
    name: 'Quản lý nhà cung cấp',
    url: '/admin/shop-management',
    icon: 'icon-puzzle'
  },
  {
    name: 'Danh sách sản phẩm',
    url: '/admin/product-management',
    icon: 'icon-puzzle'
  }
];
