import { useEffect } from 'react';

const useFullscreen = () => {
  useEffect(() => {
    const requestFullscreen = () => {
      const element = document.documentElement as HTMLElement & {
        mozRequestFullScreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
      }
    };

    // Request fullscreen on component mount
    requestFullscreen();
  }, []);
};

export default useFullscreen;
