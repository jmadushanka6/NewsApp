import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mailman-loader',
  templateUrl: './mailman-loader.component.html',
  styleUrls: ['./mailman-loader.component.scss']
})
export class MailmanLoaderComponent {
  @Input() error = false;
}
