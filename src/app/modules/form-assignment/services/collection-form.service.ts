import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Observable, map, zip } from "rxjs";
import { CollectionForm } from "../models";

@Injectable()
export class CollectionFormService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getForms(): Observable<CollectionForm[]> {
    return zip(
      this.httpClient.get("dataSets.json?fields=id,name&pageSize=10"),
      this.httpClient.get("programs.json?fields=id,name&pageSize=10")
    ).pipe(map(this.#getFormResponse));
  }

  searchForms(searchTerm: string) {
    if (searchTerm?.length === 0) {
      return this.getForms();
    }

    return zip(
      this.httpClient.get(
        `dataSets.json?fields=id,name&filter=name:ilike:${searchTerm}`
      ),
      this.httpClient.get(
        `programs.json?fields=id,name&filter=name:ilike:${searchTerm}`
      )
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
