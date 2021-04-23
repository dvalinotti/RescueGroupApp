import { HomeNavigator, HomeNavigatorData } from './home';
import { OrgNavigator, OrgNavigatorData } from './organization';
import { SearchNavigator, SearchNavigatorData } from './search';

const screens = [
  {
    name: OrgNavigatorData.name,
    icon: OrgNavigatorData.icon,
    component: OrgNavigator,
  },
  {
    name: HomeNavigatorData.name,
    icon: HomeNavigatorData.icon,
    component: HomeNavigator,
    initialRouteName: 'home',
  },
  {
    name: SearchNavigatorData.name,
    icon: SearchNavigatorData.icon,
    component: SearchNavigator,
  },
];

const icons = {};
screens.forEach(screen => (icons[screen.name] = screen.icon));

const RootNaviagtorData = {
  name: 'Root',
  screens,
  icons,
};

export default RootNaviagtorData;
