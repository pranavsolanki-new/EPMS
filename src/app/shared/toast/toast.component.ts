import { Component } from '@angular/core';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  message = '';
  type = '';
  show = false;

  constructor(private commonService: CommonService) {
    this.commonService.toastState$.subscribe(({ type, message }) => {
      this.type = type;
      this.message = message;
      this.show = true;
      setTimeout(() => this.show = false, 3000);
    });
  }
}