import { Component } from "@angular/core";

@Component({
  selector: "dashboard ui",
  template: `<h1>{{ headerTitle }}</h1>`,
})
export class DashboardComponent {
  headerTitle = "Welcome to admin dashboard";
}
