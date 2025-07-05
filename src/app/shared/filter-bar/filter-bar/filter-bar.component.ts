import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() statuses: string[] = [];
  @Input() fromDateLabel?: string = 'Select From Date';
  @Input() toDateLabel?: string = 'Select To Date';
  @Input() statusLabel?: string = 'Status'
  @Output() filtersChanged = new EventEmitter<any>();
  @Input() showDate!: boolean;
  maxDate = new Date()
  filterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
  })
  ngOnInit() {
    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      if (this.showDate) this.filtersChanged.emit(value);
      else {
        let newValue: any = {}
        for (let [key, val] of Object.entries(value)) {
          if (key == 'name' || key == 'status') {
            newValue[key] = val
          }
        }
        this.filtersChanged.emit(newValue);
      }
    })
  }

  reset() {
    this.filterForm.reset();
  }
}


