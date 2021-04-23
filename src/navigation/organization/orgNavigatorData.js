import OrgHomeScreen from '../screens/OrgHomeScreen';

const screens = [
  {
    name: 'OrgHome',
    headerTitle: 'Organization',
    component: OrgHomeScreen,
  },
];

const OrgNavigatorData = {
  name: 'Organization',
  icon: 'people-circle',
  screens,
};

export default OrgNavigatorData;
