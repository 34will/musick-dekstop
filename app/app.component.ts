import { Component } from "@angular/core";

import { ITrack } from "./types/itrack";

@Component({
	selector: "musick",
	templateUrl: "app/app.template.html"
})
export class AppComponent {
	private currentTrack: ITrack = {
		name: "Kali Ma",
		artist: "Neck Deep",
		album: "Life's Not Out To Get You",
		albumArtURI: "images/neck-deep.jpg",
		year: 2016,
		duration: 4.2
	};

	// ----- Properties ----- //

	public get CurrentTrack(): ITrack {
		return this.currentTrack;
	}

	public get Duration(): string {
		return this.currentTrack ? this.currentTrack.duration.toFixed(2).replace(".", ":") : "0:00";
	}
}
