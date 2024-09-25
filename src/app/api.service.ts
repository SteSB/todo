import { Injectable } from '@angular/core';
import axios from 'axios';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getTodos() {
    return axios.get('http://localhost:5000/todos')
  }

  getClosedTodos() {
    return axios.get('http://localhost:5000/todos/closed')
  }

  closedTodo(id: string) {
    return axios.patch('http://localhost:5000/todo/closed/' + id)
  }

  openTodo(id: string) {
    return axios.patch('http://localhost:5000/todo/open/' + id)
  }

  addTodo(todo: Todo) {
    return axios.post('http://localhost:5000/todo/add', todo, {
      headers: {
        "Access-Control-Allow-Origin": true,
        'Content-Type': 'application/json'
      },
    }).then(() => {
      window.location.href = '/all'
    })
  }
}
