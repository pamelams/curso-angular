import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() numberEmitted = new EventEmitter<number>();
  inc: number = 0;
  intervalId:any;

  ngOnInit() {
  }

  onStartGame() {
    this.intervalId = setInterval(() => {
      this.inc++;
      this.numberEmitted.emit(this.inc);
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.intervalId);
  }

}
