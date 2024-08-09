import { TestBed } from "@angular/core/testing";
import { MusicService } from "./music.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { lastValueFrom, of } from "rxjs";
import { Song } from "../models/song";

describe("MusicService", () => {
    let service: MusicService;
    const hardCodedSongs: Song[] = returnHardCodedSongs();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        }).compileComponents();

        service = new MusicService(TestBed.inject(HttpClient));

        // mock the 'getMusicFiles()' API call to return the hardcoded songs
        spyOn(service, 'getMusicFiles').and.returnValue(of(hardCodedSongs));
        service.getAndLoadSongs();
    })

    it("should create the service", () => {
        expect(service).toBeTruthy();
    });

    it('should load songs from API', async () => {
        // Act
        const songs = await lastValueFrom(service.getSongs());

        // Assert
        expect(songs).toEqual(hardCodedSongs);
    });

    it('should return songs by searching', () => {
        const songs = service.searchSongs('Song');

        expect(songs).toEqual(hardCodedSongs);
    });

    it('should return empty array if no songs are found', () => {
        jasmine.getEnv().allowRespy(true);  // workaround to let the next mock not get an error of "method already spied upon"
        spyOn(service, 'getMusicFiles').and.returnValue(of([]));
        service.getAndLoadSongs();

        const songs = service.searchSongs('Song');

        expect(songs).toEqual([]);
    });

    it('should set current song', () => {
        service.setCurrentSong(hardCodedSongs[0]);
        expect(service.currentSongIndex).toEqual(0);
    })

    it('should set next song', () => {
        service.setCurrentSong(hardCodedSongs[0]);

        service.setNextSong();

        expect(service.currentSongIndex).toEqual(1);
    })

    it('should set previous song', () => {
        service.setCurrentSong(hardCodedSongs[1]);

        service.setPreviousSong();

        expect(service.currentSongIndex).toEqual(0);
    })

    it('should set next song to the first one if it was the last song initially', () => {
        service.setCurrentSong(hardCodedSongs[1]);

        service.setNextSong();

        expect(service.currentSongIndex).toEqual(0);
    })

    it('should set previous song to the last on if it was the first song initially', () => {
        service.setCurrentSong(hardCodedSongs[0]);

        service.setPreviousSong();

        expect(service.currentSongIndex).toEqual(1);
    })

    it('should NOT set current song if it is not in the list (is set to default value)', () => {
        const randomUnexistentSong: Song = {
            title: 'random unexistent song',
            fileName: "",
            creationDate: new Date(),
            isLiked: false,
            rating: 0,
            duration: 0
        };

        service.setCurrentSong(randomUnexistentSong);

        expect(service.currentSongIndex).toEqual(0);
    })
})

function returnHardCodedSongs(): Song[] {
    return [
        {
            title: 'test song 1',
            fileName: "",
            creationDate: new Date(),
            isLiked: false,
            rating: 0,
            duration: 0
        },
        {
            title: 'test song 2',
            fileName: "",
            creationDate: new Date(),
            isLiked: false,
            rating: 0,
            duration: 0
        },
    ];
}