import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { TableService } from 'src/modules/table/services/table.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TableComponent implements OnInit {

  constructor(
    private _Injector: Injector
  ) { }

  // Array of transactions
  transactions: any = []

  // Show logs check
  showLogs = false

  async ngOnInit() {

    // Fetch the transactions with default values
    this.transactions = await this.fetchTransactions()

  }

  /**
   * This function is responsible for adding the next batch of transactions
   * @param event 
   */
  async handler(event: any){

    let newBatch = await this.fetchTransactions(this.transactions[this.transactions.length-1].rowId)

    // updating the UI with new batch
    this.transactions = [...this.transactions, ...newBatch]
  }

  /**
   * This function is responsible for tracking the index of the elements in the DOM
   * @param index 
   */
  trackByIdx(index: any) {
    return index
  }

  /**
   * This function is responisble for fetching the data from the server
   * @param cursorLte 
   */
  fetchTransactions(cursorLte?: any): any {
    return new Promise((resolve, reject) => {

      // Table service instance
      let tableService = this._Injector.get(TableService)

      tableService.fetchData(cursorLte)
        .then((res: Array<any>) => {

          // Map the results into readable objects
          res = res.map((transaction: any) => {
            return {
              "rowId": transaction[0],
              "time": transaction[1],
              "type": transaction[2],
              "sender": transaction[3],
              "volume": transaction[4],
              "status": transaction[5]
            }
          })

          // resolve the array
          resolve(res)
        })
        .catch(() => {
          reject([])
        })
    })
  }

}
