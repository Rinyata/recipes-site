import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apitry';

  constructor(private http: HttpClient, private modalService: NgbModal){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
