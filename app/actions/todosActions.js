import axios from 'axios';
import Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertsActions';

exports.createTodo = (text) => {
  return function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      var {username, password} = credentials;
      return axios.post(TODOS_URL(username), {text}, {
        headers: {authorization: password}
      }).then((response) => {
        dispatch(addTodo(response.data.todo));
      }).catch((err) => {
        dispatch(addAlert("Couldn't create todo."));
      })
    })
  }
}

exports.deleteTodo = (todo_id) => {
  return function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      var {username, password} = credentials;
      return axios.delete(TODO_URL(username, todo_id), {
        headers: {authorization: password}
      }).then((response) => {
        dispatch(removeTodo(todo_id));
      }).catch((err) => {
        dispatch(addAlert("Couldn't delete todo."));
      })
    })
  }
}

exports.getTodos = function(dispatch) {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(TODOS_URL(username), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(setTodos(response.data.todos));
    }).catch((err) => {
      dispatch(addAlert("Couldn't get todos."));
    })
  })
}

var addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  }
}

var removeTodo = (todo_id) => {
  return {
    type: 'REMOVE_TODO',
    todo_id
  }
}

export var setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    todos
  }
}
