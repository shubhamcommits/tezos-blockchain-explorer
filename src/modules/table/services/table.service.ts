import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private _http: HttpClient) { }

  // Fetch the Base Url
  baseUrl = environment.baseUrl


  /**
   * This function is responsible for fetching the data from the server
   */
  fetchData(cursorLte?: any){
    return this._http.get(this.baseUrl, {
      params: {
        columns: 'row_id,time,type,sender,volume,status',
        receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
        type: 'transaction',
        limit: '10',
        'cursor.lte':  cursorLte || '18990092'
      }
    }).toPromise()
  }


}
