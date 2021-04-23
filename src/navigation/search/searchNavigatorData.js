import SearchScreen from '../screens/SearchScreen';

// Stack navigator data for Home tab
const screens = [
  {
    name: 'Search',
    headerTitle: 'Search',
    component: SearchScreen,
    options: {},
  },
];

const data = {
  name: 'Search',
  icon: 'search',
  screens,
};

export default data;
