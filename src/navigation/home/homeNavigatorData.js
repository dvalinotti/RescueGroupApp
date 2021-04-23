import AnimalScreen from '../screens/AnimalScreen';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';

// Stack navigator data for Home tab
const screens = [
  {
    name: 'AllAnimals',
    headerTitle: 'Home',
    component: HomeScreen,
    options: {},
  },
  {
    name: 'Animal',
    headerTitle: 'Animal',
    component: AnimalScreen,
    options: {},
  },
  // {
  //   name: 'Contact',
  //   headerTitle: 'Contact Information',
  //   component: ContactScreen,
  //   options: {
  //     stackPresentation: 'modal',
  //   },
  // },
];

const data = {
  name: 'Home',
  icon: 'home',
  screens,
};

export default data;
