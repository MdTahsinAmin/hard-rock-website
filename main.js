
const apiUrl = {
    baseUrl : "https://api.lyrics.ovh"
}

const searchBtn = document.getElementById('searchBtn');
// Title and song 
searchBtn.addEventListener('click', ()=>{
     let artistSongName = document.getElementById('artistSongName').value;
    
     if(!artistSongName){
       alert('Please enter song name !');
     }
     else{
     fetch(`${apiUrl.baseUrl}/suggest/${artistSongName}`)
     .then(response => response.json())
     .then(data =>  catchAndSetSong(data))
     .catch(error => console.log(error));
     }
});

function catchAndSetSong(data){
    // console.log(data);
     let output ='';
     data.data.forEach(element => {
         output+=` <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${element.title}</h3>
                        <p class="author lead">Album by : <span> ${element.artist.name}</span> </p>
                        <p class="song lead">Artist Page link : <a class ="songLink "target ="_blank" href="${element.artist.link}">${element.title}</a> </span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                      <img style ="margin-bottom:5px; width =10px; height ="10px;" class="img-fluid rounded-circle" src="${element.artist.picture}" alt="">
                        <button class="btn btn-success" data-songTitle="${element.title}" data-artist="${element.artist.name}">Get Lyrics</button>
                    </div>
                </div>`
     });
     document.querySelector('.search-result').style.display ="block";
     document.querySelector('.search-result').innerHTML= `${output}`;
}

// Lyrics

function getLyrics(artist,songTitle){
    //https://api.lyrics.ovh/v1/artist/title
    fetch(`${apiUrl.baseUrl}/v1/${artist}/${songTitle}`)
     .then(response => response.json())
     .then(data => showLyrics(data,artist,songTitle));
}

const result = document.getElementById('resultLyrics');

result.addEventListener('click',e =>{
    
    const target = e.target;

    if(target.tagName =="BUTTON"){
        const artist = target.getAttribute('data-artist');
        const songTitle = target.getAttribute('data-songTitle');
        getLyrics(artist,songTitle);
    }
})

function showLyrics(data,artist,songTitle){
    //console.log(data);
   const lyricsPart =  document.querySelector('.single-lyrics');
   lyricsPart.style.display ="block";
   lyricsPart.innerHTML =`<button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
                <pre class="lyric text-white">${data.lyrics}</pre>`;


}