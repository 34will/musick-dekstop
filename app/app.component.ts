import { Component } from "@angular/core";
import { TimeUnit } from "typescript-dotnet-system/System/Time/TimeUnit";
import { TimeSpan } from "typescript-dotnet-system/System/Time/TimeSpan";

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

	public TogglePlay(): void {
		this.service.TogglePlay();
	}

	public ToggleShuffle(): void {
		this.service.ToggleShuffle();
	}

	public CycleRepeat(): void {
		this.service.CycleRepeat();
	}

	// ----- Properties ----- //

	public get CurrentTrack(): ITrack {
		return this.service.CurrentTrack;
	}

	public get CurrentDuration(): TimeSpan {
		return this.service.CurrentDuration;
	}

	public get CurrentDifference(): TimeSpan {
		return this.service.CurrentDuration.addUnit(-this.service.CurrentTrack.duration.ticks, TimeUnit.Ticks);
	}

	public get Playing(): boolean {
		return this.service.Playing;
	}

	public get Shuffle(): boolean {
		return this.service.Shuffle;
	}

	public get Repeat(): Repeat {
		return this.service.Repeat;
	}
}
