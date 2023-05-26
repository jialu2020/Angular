import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() featureSelected = new EventEmitter<string>();


  onSelect(feature: string){
    this.featureSelected.emit(feature);  //将feature这个string recipe/shopping-list发送到app
  }

  ngOnInit(){
  }

}
