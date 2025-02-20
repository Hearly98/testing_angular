import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-testing-services';

  ngOnInit(){
    const calculator = new Calculator();
    const rta = calculator.multiply(1,4);
    const rta2 = calculator.divide(20,5);
  }
}
