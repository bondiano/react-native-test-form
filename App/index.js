import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CreateAccount } from './screens/CreateAccount';
import { SignIn } from './screens/SignIn';

const AppNavigator = createStackNavigator({
  CreateAccount: {
    title: 'Create Account',
    screen: CreateAccount,
    header: () => 'Create Account',
  },
  SignIn: {
    title: 'Sign In',
    screen: SignIn,
    header: () => 'Sign In',
  },
});

export default createAppContainer(AppNavigator);
