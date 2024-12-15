import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerModule],
  template: `<router-outlet></router-outlet>
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "large" color = "#fff" type = "timer" [fullScreen] = "true"><p style="color: white" > Lütfen Bekleyiniz.. </p></ngx-spinner>
  `
})
export class AppComponent {
  title = 'kamp';
}
