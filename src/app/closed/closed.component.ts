import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Todo } from '../../types/todo';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-closed',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './closed.component.html',
  styleUrl: './closed.component.css'
})
export class ClosedComponent {
  todos: Todo[] = [];

  constructor(private api: ApiService) {
    this.api.getClosedTodos().then(resp => {
      this.todos = resp.data
    })
    .catch(err => {
      console.log(err)
    });
  }
}
