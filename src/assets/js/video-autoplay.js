import { gsap } from 'gsap'
document.addEventListener('DOMContentLoaded', () => {
    function playVideos() {
        let mm = gsap.matchMedia()

        mm.add('(min-width: 768px)', () => {
            const videos = document.querySelectorAll('video')

            videos.forEach((video) => {
                video.setAttribute('src', video.getAttribute('data-src'))
                video.play()
            })
        })
    }

    window.addEventListener('load', playVideos)
})
