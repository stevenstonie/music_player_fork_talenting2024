import { TestBed } from "@angular/core/testing";
import { MusicService } from "./music.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { lastValueFrom, of } from "rxjs";
import { Song } from "../models/song";

describe("MusicService", () => {
    let service: MusicService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        }).compileComponents();

        service = new MusicService(TestBed.inject(HttpClient));
    })

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it('should load songs from API', async () => {
        // Arrange
        const hardCodedSongs: Song[] = returnHardCodedSongs();

        // mock the 'getMusicFiles()' API call to return the hardcoded songs
        spyOn(service, 'getMusicFiles').and.returnValue(of(hardCodedSongs));

        // Act
        const songs = await lastValueFrom(service.getSongs());

        // Assert
        expect(songs).toEqual(hardCodedSongs);
    });
})

function returnHardCodedSongs(): Song[] {
    return [
        {
            title: 'Song 1',
            fileName: "",
            creationDate: new Date(),
            isLiked: false,
            rating: 0,
            duration: 0
        },
        {
            title: 'Song 2',
            fileName: "",
            creationDate: new Date(),
            isLiked: false,
            rating: 0,
            duration: 0
        },
    ];
}