import {terbilang} from '../utils/terbilang'


export const playAudioSequence = (audioSources: string[], index = 0) => {
    if (index >= audioSources.length) {
        // All audio files have been played
        return;
      }
      const audio = new Audio(audioSources[index]);
      audio.addEventListener('ended', () => {
        // Play the next audio file in the sequence
        playAudioSequence(audioSources, index + 1);
      });
      audio.addEventListener('error', (error) => {
        console.error('Error occurred while playing audio:', error);
        // Move on to the next audio file in case of an error
        playAudioSequence(audioSources, index + 1);
      });

      audio.volume = 1;

      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
        // Move on to the next audio file in case of an error
        playAudioSequence(audioSources, index + 1);
      });
  };
  
  export const handlePlaySound = (inputValue: string, loket: number) => {
    const number = parseInt(inputValue, 10);
    const audioSources = terbilang(number);
    

    
    if (audioSources) {
      playAudioSequence(audioSources.split('|'));
    }
  };
  