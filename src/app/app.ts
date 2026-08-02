import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMap } from "pages/MainMap"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMap],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
