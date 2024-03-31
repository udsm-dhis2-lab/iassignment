import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CircularLoader } from "@dhis2/ui";
import * as React from "react";
import { Observable, tap } from "rxjs";
import { FormAssignmentService } from "./services";
import { CollectionForm } from "./models";

@Component({
  selector: "app-form-assignment",
  templateUrl: "./form-assignment.component.html",
  styleUrl: "./form-assignment.component.css",
})
export class FormAssignmentComponent implements OnInit {
  ngOnInit(): void {}
}
