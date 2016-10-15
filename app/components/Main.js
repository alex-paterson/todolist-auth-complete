import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

// import {unauthUser} from '../actions';
// onLogout: function() {
//   this.props.dispatch(unauthUser);
// },
// <TouchableOpacity onPress={this.onLogout}>
//   <Text>
//     Logout
//   </Text>
// </TouchableOpacity>

import TodoList from './TodoList';

var Main = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TodoList,
          title: 'Todo List',
          navigationBarHidden: true
        }}
        style={{flex: 1}}/>
    );
  }
});

module.exports = Main;
