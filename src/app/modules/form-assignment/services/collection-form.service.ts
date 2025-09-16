import { Injectable } from "@angular/core";
import { D2Window } from "@iapps/d2-web-sdk";
import { Observable, from, map, zip } from "rxjs";
import { CollectionForm } from "../models";

@Injectable()
export class CollectionFormService {
  constructor() {}

  getForms(): Observable<CollectionForm[]> {
    const d2 = (window as unknown as D2Window)?.d2Web;
    return zip(
      from(
        d2?.httpInstance?.get("dataSets.json?fields=id,name&pageSize=10")
      ).pipe(map((response) => response.data)),
      from(
        d2?.httpInstance?.get("programs.json?fields=id,name&pageSize=10")
      ).pipe(map((response) => response.data))
    ).pipe(map(this.#getFormResponse));
  }

  searchForms(searchTerm: string) {
    if (searchTerm?.length === 0) {
      return this.getForms();
    }

    const d2 = (window as unknown as D2Window)?.d2Web;

    return zip(
      from(
        d2?.httpInstance?.get(
          `dataSets.json?fields=id,name&filter=name:ilike:${searchTerm}`
        )
      ).pipe(map((response) => response.data)),
      from(
        d2?.httpInstance?.get(
          `programs.json?fields=id,name&filter=name:ilike:${searchTerm}`
        )
      ).pipe(map((response) => response))
    ).pipe(map(this.#getFormResponse));
  }

  #getFormResponse(responses: any[]) {
    const [dataSetResponse, programResponse] = responses;
    return [
      ...(dataSetResponse.dataSets || []).map(
        (dataSet) => new CollectionForm({ ...dataSet, type: "DATASET" })
      ),
      ...(programResponse.programs || []).map(
        (program) => new CollectionForm({ ...program, type: "PROGRAM" })
      ),
    ];
  }
}
