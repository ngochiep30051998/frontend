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

export const navItems: NavData[] = [
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
        name: 'danh sách sản phẩm',
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
  {
    name: 'Quản lý cửa hàng',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'danh sách cửa hàng',
        url: '/admin/shop-management',
        icon: 'icon-puzzle'
      },
      {
        name: 'Thêm cửa hàng',
        url: '/admin/shop',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Quản lý đơn hàng',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
    ]
  }
];
