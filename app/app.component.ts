import { Component } from "@angular/core";
import { TimeUnit } from "typescript-dotnet-system/System/Time/TimeUnit";
import { TimeSpan } from "typescript-dotnet-system/System/Time/TimeSpan";

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
		duration: new TimeSpan(4.25, TimeUnit.Minutes)
	};
	private currentDuration: TimeSpan = new TimeSpan(0);

	ngOnInit() {
		setInterval(() => this.currentDuration = this.currentDuration.addUnit(100, TimeUnit.Milliseconds), 100);
	}

	public TimeSpanToString(duration: TimeSpan): string {
		return duration ? (duration.direction * duration.time.minute) + ":" + (duration.time.second < 10 ? "0" + duration.time.second.toString() : duration.time.second) : "0:00";
	}

	// ----- Properties ----- //

	public get CurrentTrack(): ITrack {
		return this.currentTrack;
	}

	public get CurrentDuration(): TimeSpan {
		return this.currentDuration;
	}

	public get CurrentDifference(): TimeSpan {
		return this.currentDuration.addUnit(-this.currentTrack.duration.ticks, TimeUnit.Ticks);
	}
}
