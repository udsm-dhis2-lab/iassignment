import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RangePipe } from 'ngx-pipes';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [RangePipe]
})
export class PaginationComponent implements OnInit {
  @Input()
  itemsPerPage;

  @Input()
  currentPage;

  @Input()
  pageInterval;

  @Input()
  dataArray;

  @Output()
  updateItemsPerPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  changeCurrentPage: EventEmitter<any> = new EventEmitter<any>();

  maxSize: any;
  pagingIntervals: any;
  page: number = 1;

  constructor(private rangePipe: RangePipe) {}
  ngOnInit() {
    if (this.dataArray) {
      this.maxSize = this.dataArray.length;
      this.pagingIntervals = this.rangePipe.transform(
        1,
        Math.round(this.maxSize / this.pageInterval)
      );
    }
  }

  onSetItemsPerPage(e) {
    if (e) {
      e.stopPropagation();
    }
    const pageSize = e ? e.target.value.trim() : this.itemsPerPage;
    this.updateItemsPerPage.emit((this.itemsPerPage = pageSize));
    this.pageInterval = pageSize;
  }

  onChangeCurrentPage(e) {
    if (e) {
      this.changeCurrentPage.emit((this.currentPage = e));
    }
  }
}
