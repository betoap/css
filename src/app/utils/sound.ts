export class Sound {

  public static stop () {
  }

  public static play (
    name: string,
    path: string = './assets/sound/'
  ) {

    const audioElement = document.createElement('audio');

    if (navigator.userAgent.match('Firefox/')) {
      audioElement.setAttribute('src', `${path}${name}.ogg`);
    } else {
      audioElement.setAttribute('src', `${path}${name}.mp3`);
    }

    audioElement.addEventListener('load', function() {
      audioElement.play();
    }, true);

    audioElement.pause();
    audioElement.play();
  }
}
