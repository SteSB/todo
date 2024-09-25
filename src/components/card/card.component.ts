import { Component, Input } from '@angular/core';
import { Todo } from '../../types/todo';
import { ApiService } from '../../app/api.service';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'], 
})
export class CardComponent {
  @Input() todo: Todo = {
    id: '',
    title: '',
    description: '',
    date: 0,
    start: 0,
    end: 0,
    status: 'open',
  };

  date: string | undefined;
  start: string | undefined;
  end: string | undefined;
  edit: boolean = true;

  protected closed: boolean = false;

  constructor(private api: ApiService) { 
    this.cardUpdate();
  }

  ngOnChanges() {
    this.cardUpdate();
  }

  handlerCheckbox(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.api.closedTodo(this.todo.id).then(resp => {
        console.log(resp.data.message)
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.api.openTodo(this.todo.id).then(resp => {
        console.log(resp.data.message)
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  private cardUpdate() {
    if(this.todo.status == 'open')
      this.closed = false;
    else
      this.closed = true

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const cardDate = new Date(this.todo.date);
    this.date = cardDate.toLocaleDateString('it-IT');

    if (cardDate < today) 
      this.edit = false 
    else
      this.edit = true

    this.start = new Date(this.todo.start).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.end = new Date(this.todo.end).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
