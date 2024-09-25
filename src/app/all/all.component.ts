import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  todos: Todo[] = [];

  constructor(private api: ApiService) {
    this.api.getTodos().then(resp => {
      this.todos = resp.data
    })
    .catch(err => {
      console.log(err)
    });
  }

}
