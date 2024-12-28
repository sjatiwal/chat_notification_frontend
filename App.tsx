import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/Navigation/AppContainer';
import {Provider} from 'react-redux';
import store from './src/store/store';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {/* wrapping app in provider to access data from redux  */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
