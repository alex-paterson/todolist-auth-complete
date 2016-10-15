import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';

import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';
import NewTodo from './NewTodo';

var TodoItem = connect()(React.createClass({
  getInitialState() {
    return {
      deleting: false
    }
  },
  onDelete() {
    this.setState({deleting: true});
    this.props.dispatch(deleteTodo(this.props.id));
  },
  render() {
    var renderDeleteButton = () => {
      if (!this.state.deleting) {
        return (
          <TouchableOpacity onPress={this.onDelete}>
            <Icon name="x" size={15} color='#2ecc71'/>
          </TouchableOpacity>
        )
      }
    }
    return (
      <View style={styles.todoContainer}>
        <Text>{this.props.text}</Text>
        {renderDeleteButton()}
      </View>
    )
  }
}));

var TodoList = React.createClass({
  getInitialState() {
    return {
      refreshing: false
    }
  },
  onLogout() {
    this.props.dispatch(setTodos([]));
    this.props.dispatch(unauthUser);
  },
  addNewTodo() {
    this.props.navigator.push({
      component: NewTodo,
      title: 'New Todo',
      navigationBarHidden: true
    })
  },
  onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(getTodos).then(() => {
      this.setState({refreshing: false});
    })
  },
  render() {
    console.log("todos", this.props.todos);
    var renderTodos = () => {
      return this.props.todos.map((todo) => {
        return (
          <TodoItem key={todo._id} text={todo.text} id={todo._id}/>
        )
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onLogout}>
            <Icon name="x" size={20} color="white"/>
          </TouchableOpacity>
          <Text style={styles.title}>
            To-Do List
          </Text>
          <TouchableOpacity onPress={this.addNewTodo}>
            <Icon name="plus" size={20} color="white"/>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}/>
          }
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollViewContainer}>
          {renderTodos()}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  todoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

var mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

module.exports = connect(mapStateToProps)(TodoList);
