import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['p,button,h1{font-family:"sans-serif"; color: #333}']
})
export class AppComponent implements OnInit {
  private socket: Subject<any>;
  private counterSubscription: Subscription;
  private message: string;
  private sentMessage: string;

  constructor(websocketService: WebsocketService){
    this.socket = websocketService.createWebsocket();
  }

  ngOnInit(){
    this.socket.subscribe(
      message => this.message = message.data
    );
  }

  private launchCounter(){
    if(this.counterSubscription){ //Counter already initialized
      this.counterSubscription.unsubscribe();
    }
    this.counterSubscription = Observable.interval(1000).subscribe(
      num => {
        this.sentMessage = 'Websocket Message '+ num;
        this.socket.next(this.sentMessage);
      }
    );
  }
}
