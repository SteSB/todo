import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  title: string = '';
  description: string = '';
  date: string = '';
  start: string = '';
  end: string = '';

  constructor(private api: ApiService) {}

  protected addTodo() {
    const startDateTime = new Date(`${this.date}T${this.start}`).getTime();
    const endDateTime = new Date(`${this.date}T${this.end}`).getTime();
    const dateTimestamp = new Date(`${this.date}`).getTime();

    const todo = {
      id: '',
      title: this.title,
      description: this.description,
      date: dateTimestamp,
      start: startDateTime,
      end: endDateTime,
      status: "open"
    };
    this.api.addTodo(todo);
  }

  private resetFields() {
    this.title = '';
    this.description = '';
    this.date = '';
    this.start = '';
    this.end = '';
  }
}
