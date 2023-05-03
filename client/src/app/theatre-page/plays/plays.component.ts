import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Play } from 'src/app/_models/play';
import { AccountService } from 'src/app/_services/account.service';
import { TheatreService } from 'src/app/_services/theatre.service';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  plays: Play[] = [];
  constructor(
    private sanitizer: DomSanitizer,
    private theatreService: TheatreService,
    private accountService:AccountService
  ) {}

  ngOnInit(): void {
    this.getPlays();
  }

  getPlays() {
    
    this.theatreService.getPlaysByCurrentUser().subscribe((data) => {
      this.plays = data;
    });
  }

  getImageUrl(row: Play): SafeUrl {
    const imageDataBytes = new Uint8Array(
      atob(row.image)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));

    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + base64ImageData
    );
  }

  deletePlay(id: number) {
    this.theatreService.deletePlay(id).subscribe(() => {
      this.getPlays();
    });
  }

}
