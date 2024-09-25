import { Component, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TopnavComponent } from "../components/topnav/topnav.component";
import { CommonModule } from '@angular/common';
import { AddComponent } from "../components/add/add.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopnavComponent, RouterLink, RouterLinkActive, CommonModule, AddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo'
  today: string = new Date().toLocaleDateString("it-IT");
  view: boolean = false;

  constructor() {}

  public viewForm() {
    this.view = !this.view;
  }
}
