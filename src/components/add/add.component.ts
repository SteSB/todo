import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../app/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-hover',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  @Output() toggleView = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  date: string = '';
  start: string = '';
  end: string = '';

  constructor(private api: ApiService) {}

  public closeView() {
    this.toggleView.emit();
  }

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

  protected close() {
    this.resetFields();
    this.closeView()
  }

  private resetFields() {
    this.title = '';
    this.description = '';
    this.date = '';
    this.start = '';
    this.end = '';
  }
}
