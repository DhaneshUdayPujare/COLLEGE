class Node {
    constructor(song) {
        this.song = song;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.current = null;
    }

    add(song) {
        const newNode = new Node(song);
        if (!this.head) {
            this.head = newNode;
            this.current = this.head;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        this.updatePlaylist();
    }

    removeCurrent() {
        if (!this.head) return; // No songs to remove
        if (this.head === this.current) {
            this.head = this.head.next;
            this.current = this.head;
        } else {
            let temp = this.head;
            while (temp.next && temp.next !== this.current) {
                temp = temp.next;
            }
            if (temp.next) {
                temp.next = this.current.next;
                this.current = this.current.next || this.head; // Move to next or reset to head
            }
        }
        this.updatePlaylist();
    }

    next() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        } else {
            this.current = this.head; // Loop back to start
        }
        this.updateCurrentSong();
    }

    previous() {
        if (!this.head || this.head === this.current) return; // No previous if at head
        let temp = this.head;
        while (temp.next && temp.next !== this.current) {
            temp = temp.next;
        }
        this.current = temp;
        this.updateCurrentSong();
    }

    shuffle() {
        const songs = [];
        let temp = this.head;

        // Extract songs into an array
        while (temp) {
            songs.push(temp.song);
            temp = temp.next;
        }

        // Shuffle array
        for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }

        // Rebuild the linked list with shuffled order
        this.head = null;
        this.current = null;
        songs.forEach(song => this.add(song));
    }

    sortAlphabetically() {
        const songs = [];
        let temp = this.head;

        // Extract songs into an array
        while (temp) {
            songs.push(temp.song);
            temp = temp.next;
        }

        // Sort the array alphabetically
        songs.sort();

        // Rebuild the linked list in sorted order
        this.head = null;
        this.current = null;
        songs.forEach(song => this.add(song));
    }

    updatePlaylist() {
        const playlistDiv = document.getElementById("playlist");
        playlistDiv.innerHTML = "<strong>Playlist:</strong>";

        // Create a table for the playlist
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>Song No.</th><th>Song Name</th>";
        table.appendChild(headerRow);

        let temp = this.head;
        let index = 1;
        while (temp) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index}</td><td>${temp.song}</td>`;
            if (temp === this.current) {
                row.style.backgroundColor = "#f0f8ff"; // Highlight the current song
            }
            table.appendChild(row);
            temp = temp.next;
            index++;
        }
        playlistDiv.appendChild(table);
        this.updateCurrentSong();
    }

    updateCurrentSong() {
        const currentSongDiv = document.getElementById("currentSong");
        currentSongDiv.innerHTML = `<strong>Current Song:</strong> ${this.current ? this.current.song : "None"}`;
    }
}

// Initialize the playlist
const playlist = new LinkedList();

// Attach event listeners
document.getElementById("addSongBtn").addEventListener("click", () => {
    const songInput = document.getElementById("songInput");
    const songName = songInput.value.trim();
    if (songName) {
        playlist.add(songName);
        songInput.value = ""; // Clear the input field
    } else {
        alert("Please enter a song name.");
    }
});

document.getElementById("removeSongBtn").addEventListener("click", () => {
    playlist.removeCurrent();
});

document.getElementById("nextSongBtn").addEventListener("click", () => {
    playlist.next();
});

document.getElementById("previousSongBtn").addEventListener("click", () => {
    playlist.previous();
});

document.getElementById("shufflePlaylistBtn").addEventListener("click", () => {
    playlist.shuffle();
});

document.getElementById("sortPlaylistBtn").addEventListener("click", () => {
    playlist.sortAlphabetically();
});
