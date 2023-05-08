

const toggleButton = document.querySelector('.navbar-toggle');
const menu = document.querySelector('.navbar-menu');

toggleButton.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Get the popup element
var popup = document.querySelector('.popup');

// Get the close button
var closeBtn = document.querySelector('.ok');

// When the user clicks the close button, hide the popup
closeBtn.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, hide it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
let check;
var check_data;
async function kill_monkey(){



  await fetch('/money-in-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    } 
   
  })
  .then(async (response) => await response.json())
  .then(async(data)=> {
check_data = {date : await data.date , Earn : await data.Earn}
// console.log(check_data)
    })
  .catch(error => console.error(error));
// console.log(check_data.date)
if (check_data.date ==`${new Date().getDate()}/${new Date().getMonth()}` && check_data.Earn >= 400)
{
  // console.log(check_data)
  check = 0;
  // console.log(isgood)
}
else{
  // console.log('h')
  // console.log(check_data)
  check = 1;
}
}
// Show the popup when the page loads

 
var yt_videos = ["https://www.youtube.com/embed/QQKasGzoJ0E?enablejsapi=1","https://www.youtube.com/embed/R1FZ5vVzWiI?enablejsapi=1","https://www.youtube.com/embed/smi-89_qFbk?enablejsapi=1","https://www.youtube.com/embed/v69xe07VcX8?enablejsapi=1"]

// TIMER<iframe width="560" height="315" src= title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

 // Variable to store the start time
var stopwatchElement = document.getElementById("timer"); // The stopwatch element to update
var inter;

let seconds = 0;

var youtubePlayer;

async function updateStopwatch() {

if(seconds<35){
  seconds+=1;
}
  
else if(seconds==35){
 let moneys = [35 , 30 , 25 , 19 , 21, 22]
 var money;
seconds+=1
let data;
await kill_monkey()


if(check == 1){
  // console.log(isgood)
if(document.getElementById('balance')==0 || document.getElementById('balance')==1){
 data = {
    money : 35
  };
}
else{
  let randomIndex = Math.floor(Math.random() * moneys.length);
   money = moneys[randomIndex];
   
   data = {
    money : money
   }
}


  


fetch('/money-in-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

youtubePlayer.pauseVideo();

popup.style.display = "block";
document.getElementById('Popup_text').textContent = `₹ ${money} Credited to Your Account . to check`
}



else{
  
  // alert('you have reached your daily limit of ₹400 per day')
  popup.style.display = 'block';
  document.getElementById('Popup_text').textContent = 'you have reached your daily limit of ₹400 per day'
}

}

else if(seconds>35){
seconds=0;


}
    // var elapsedTime = new Date() - ; // Calculate the elapsed time
    // preTime = elapsedTime;

    // var seconds = Math.floor((elapsedTime % 60000) / 1000);
    // Calculate the seconds
    // const sec = seconds

    // Format the time as hh:mm:ss and update the stopwatch element
    stopwatchElement.textContent = `video must be played for ${seconds}/35 seconds`;
    // stopwatchElement.textContent = `video must be played for ${additional_time}/35 seconds`;

}

function startStopwatch() {
  // var preTime = new Date();
  //  = new Date();

  // Store the current time
  inter = setInterval(updateStopwatch, 1000); // Update the stopwatch every second
  // preTime = new Date()
}



function stopStopwatch() {
    // curr_time = new Date()
    // additional_time = curr_time - preTime
    // additional_time = Math.floor((additional_time % 60000) / 1000);
    // console.log(preTime)
    // console.log(curr_time)
    // console.log(additional_time)

    clearInterval(inter); // Stop updating the stopwatch
    console.log(`hello world`)
}

// .......................


function loadYoutubeApi() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


// get the iframe element

let player = document.getElementById('video_');
function  onYouTubeIframeAPIReady() {
    
  
    youtubePlayer = new YT.Player(player, {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    }
    

    );

}
// var num = 1;
// create the YouTube player object
// function inter() {
//     num += 1;
//     console.log(num)
//     document.getElementById('timer').textContent = `video must be played for ${num}/35 seconds`;
// }


// when the player is ready, start playing the video
function onPlayerReady(event) { // event.target.playVideo();
    let watch = document.getElementById('watch');

    watch.removeAttribute('disabled');
    
    youtubePlayer.playVideo()
    watch.textContent = 'Watch Video'
}


let play_pauseVideo = () => {
    if (document.getElementById('watch').textContent == 'Watch Video') {

        youtubePlayer.playVideo();
        



    } else if (document.getElementById('watch').textContent == 'Pause Video') {
        youtubePlayer.pauseVideo();
        

    }
}
// play the video


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('The video is now playing.');
        startStopwatch()
        document.getElementById('watch').textContent = 'Pause Video';
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log('The video is now paused.');
        document.getElementById('watch').textContent = 'Watch Video';
        stopStopwatch()
    }
    else if(event.data == YT.PlayerState.ENDED){
      const randomIndex = Math.floor(Math.random() * yt_videos.length);
      const randomVideo = yt_videos[randomIndex];
      let player = document.getElementById('video_');
      player.setAttribute('src',randomVideo)
      document.getElementById('watch').setAttribute('disabled',true)
      document.getElementById('watch').textContent = 'Wait a Minute'
      onYouTubeIframeAPIReady()
      // watch.removeAttribute('disabled');
      // document.getElementById('watch').textContent = 'Watch Video';
      stopStopwatch()

    }}

// pause the video

window.onload =  loadYoutubeApi;
// loadYoutubeApi()


// play the video when the play button is clicked
document.getElementById('watch').addEventListener('click', play_pauseVideo);


// pause the video when the pause button is clicked
