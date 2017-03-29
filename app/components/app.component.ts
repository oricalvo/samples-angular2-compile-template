import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {CompilerService} from "../services";

@Component({
  selector: "my-app",
  moduleId: module.id,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("marker", {read: ViewContainerRef}) marker: ViewContainerRef;
  counter: number;

  constructor(private compiler: CompilerService) {
    this.counter = 1;
  }

  async compileTemplate() {
    this.compiler.injectTemplate(this.marker, "<h1>{{state.counter}}</h1>", this);
  }

  inc() {
    ++this.counter;
  }
}