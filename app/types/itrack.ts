import { TimeSpan } from "typescript-dotnet-system/System/Time/TimeSpan";

export class ITrack {
	name: string;
	artist: string;
	album: string;
	albumArtURI: string;
	year: number;
	duration: TimeSpan;
}
