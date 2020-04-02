export interface NavItem {
  dev?: boolean;
  route: string;
  label: string;
  title?: string;
  type?: 'data';
}

export const NavItems: NavItem[] = [
  { route: 'dashboard', label: 'Statistics' },
  { route: 'maps', label: 'Maps' },
  { route: 'resources', label: 'Coronavirus Info', dev: true },
  { route: 'testing', label: 'Testing Centres' },
  { route: 'news', label: '"Good news" stories' },
  { route: 'about', label: 'About' },
  { route: 'data', label: 'Data' }
];
