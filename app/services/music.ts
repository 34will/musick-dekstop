import { Injectable } from "@angular/core";
import { TimeSpan } from "typescript-dotnet-system/System/Time/TimeSpan";
import { TimeUnit } from "typescript-dotnet-system/System/Time/TimeUnit";

import { ITrack } from "../types/itrack";

export enum Repeat {
	None = 0,
	Single = 1,
	Playlist = 2
}

@Injectable()
export class MusicService {
	private currentTrack: ITrack = {
		name: "Kali Ma",
		artist: "Neck Deep",
		album: "Life's Not Out To Get You",
		albumArtURI: "images/neck-deep.jpg",
		year: 2016,
		duration: new TimeSpan(4.25, TimeUnit.Minutes)
	};
	private currentDuration: TimeSpan = new TimeSpan(0);
	private playing: boolean = true;
	private shuffle: boolean = false;
	private repeat: Repeat = Repeat.None;

	constructor() {
		setInterval(() => this.Update(), 100);
	}

	private Update(): void {
		if (this.playing) {
			this.currentDuration = this.currentDuration.addUnit(100, TimeUnit.Milliseconds);
		}
	}

	public TogglePlay(): void {
		this.playing = !this.playing;
	}

	public Play(): void {
		this.playing = true;
	}

	public Pause(): void {
		this.playing = false;
	}

	public ToggleShuffle(): void {
		this.shuffle = !this.shuffle;
	}

	public CycleRepeat(): void {
		this.repeat += 1;

		if (this.repeat >= 3) {
			this.repeat = 0;
		}
	}

	// ----- Properties ----- //

	public get CurrentTrack(): ITrack {
		return this.currentTrack;
	}

	public get CurrentDuration(): TimeSpan {
		return this.currentDuration;
	}

	public get Playing(): boolean {
		return this.playing;
	}

	public get Shuffle(): boolean {
		return this.shuffle;
	}

	public get Repeat(): Repeat {
		return this.repeat;
	}
}
