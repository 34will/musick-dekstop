import { Component } from "@angular/core";
import { TimeUnit } from "typescript-dotnet-system/System/Time/TimeUnit";
import { TimeSpan } from "typescript-dotnet-system/System/Time/TimeSpan";

import { Colour } from "./utility/colour"
import { Repeat } from "./services/music";
import { MusicService } from "./services/music";
import { ITrack } from "./types/itrack";

@Component({
	selector: "musick",
	providers: [MusicService],
	templateUrl: "app/app.template.html"
})
export class AppComponent {
	private service: MusicService;

	constructor(service: MusicService) {
		this.service = service;
	}

	public TimeSpanToString(duration: TimeSpan): string {
		return duration ? (duration.direction * duration.time.minute) + ":" + (duration.time.second < 10 ? "0" + duration.time.second.toString() : duration.time.second) : "0:00";
	}

	public DarkenColour(colour: string, amount: number = null): string {
		return amount ? Colour.DarkenHex(colour, amount, true) : colour;
	}

	// ----- Properties ----- //

	public get Service(): MusicService {
		return this.service;
	}

	public get CurrentDifference(): TimeSpan {
		return this.service.CurrentDuration.addUnit(-this.service.CurrentTrack.duration.ticks, TimeUnit.Ticks);
	}
}
