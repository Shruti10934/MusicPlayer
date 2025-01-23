console.log("Welcome to spotify");
let songs = [
    {songName:"Legion", filepath: "songs/1.mp3", cover: "covers/1.jpg"},
    {songName:"Cartel", filepath: "songs/2.mp3", cover: "covers/2.jpg"},
    {songName:"They made", filepath: "songs/3.mp3", cover: "covers/3.jpg"},
    {songName:"Plug walk", filepath: "songs/4.mp3", cover: "covers/4.jpg"},
    {songName:"Artist name", filepath: "songs/5.mp3", cover: "covers/5.jpg"},
    {songName:"The safety dance", filepath: "songs/6.mp3", cover: "covers/6.jpg"},
    {songName:"Back it up", filepath: "songs/7.mp3", cover: "covers/7.jpg"},
    {songName:"True love", filepath: "songs/10.mp3", cover: "covers/10.jpg"},
    {songName:"Mine walk", filepath: "songs/9.mp3", cover: "covers/9.jpg"}
]

let audioIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progessBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
document.getElementById('palyedSongName').innerText = `${songs[audioIndex].songName}`;


// change song name
songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


// handle play/pause button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        const id = document.getElementById(`${audioIndex}`);
        id.classList.remove('fa-play');
        id.classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
})

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (event)=>{
        makeAllPlay();
        event.target.classList.remove('fa-play');
        event.target.classList.add('fa-pause');
        console.log(event.target.id);
        audioIndex = parseInt(event.target.id);
        audioElement.src = songs[audioIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.getElementById('palyedSongName').innerText = `${songs[audioIndex].songName}`;
    })
})

audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseFloat((audioElement.currentTime/ audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value*audioElement.duration/100;
})

forward.addEventListener('click', ()=>{
    let playedSong = document.getElementById(`${audioIndex}`);
    playedSong.classList.remove('fa-pause');
    playedSong.classList.add('fa-play');
    audioIndex += 1;
    if(audioIndex == 9){
        audioIndex = 0;
    }
    playedSong = document.getElementById(`${audioIndex}`);
    playedSong.classList.remove('fa-play');
    playedSong.classList.add('fa-pause');
    audioElement.currentTime = 0;
    audioElement.src = songs[audioIndex].filepath;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById('palyedSongName').innerText = `${songs[audioIndex].songName}`;

})

backward.addEventListener('click', ()=>{
    let playedSong = document.getElementById(`${audioIndex}`);
    playedSong.classList.remove('fa-pause');
    playedSong.classList.add('fa-play');
    audioIndex -= 1;
    if(audioIndex == -1){
        audioIndex = 0;
    }
    playedSong = document.getElementById(`${audioIndex}`);
    playedSong.classList.remove('fa-play');
    playedSong.classList.add('fa-pause');
    audioElement.currentTime = 0;
    audioElement.src = songs[audioIndex].filepath;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById('palyedSongName').innerText = `${songs[audioIndex].songName}`;
})





