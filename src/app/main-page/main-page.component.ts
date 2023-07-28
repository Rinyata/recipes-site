import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private http: HttpClient, private modalService: NgbModal,  private route:ActivatedRoute){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
