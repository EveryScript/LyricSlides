let overlayControls = document.getElementById('overlay-controls')
let btnFullSize = document.getElementById('btn-full-size')
let btnExitToMenu = document.getElementById('btn-exit')
let btnBlackScreen = document.getElementById('btn-black-screen')
let labelSlidesContent = document.querySelector('#label-slides-content')
let slidesContainer = document.querySelector('#container-slides')
let slidesContentObject = localStorage.getItem('slides-content')

// Show or hide controls when mouse move
let idleTimer = null;
let idleState = false;
function showOverlayControls(time) {
    clearTimeout(idleTimer);
    if (idleState == true) {
        overlayControls.classList.remove("overlay-hidden");
    }
    idleState = false;
    idleTimer = setTimeout(function () {
        overlayControls.classList.add("overlay-hidden");
        idleState = true;
    }, time);
}
addEventListener('mousemove', () => showOverlayControls(2000))

// Btn full screen
btnFullSize.addEventListener('click', e => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btnFullSize.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 9h4m0 0V5m0 4L4 4m15 5h-4m0 0V5m0 4 5-5M5 15h4m0 0v4m0-4-5 5m15-5h-4m0 0v4m0-4 5 5"/>
        </svg>`
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            btnFullSize.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5" />
        </svg>`
        }
    }
})

// Btn back to menu
btnExitToMenu.addEventListener('click', () => window.history.go(-1))

// Btn black screen
btnBlackScreen.addEventListener('click', () => {
    let blackEvent = new KeyboardEvent("keydown", {
        which: 66,
        key: 'b',
        code: 'KeyB',
        keyCode: 66,
        charCode: 66
    })
    document.dispatchEvent(blackEvent)
})

// Set lyrics setup
checkSlidesContentObject()
function checkSlidesContentObject() {
    if (slidesContentObject) {
        let slidesObject = JSON.parse(slidesContentObject)
        switch (slidesObject.backgroundType) {
            case 'color': slidesContainer.dataset.background = slidesObject.backgroundName; break
            case 'image': slidesContainer.setAttribute('data-background-image', '../assets/img/' + slidesObject.backgroundName); break
            case 'video':
                slidesContainer.setAttribute('data-background-video', '../assets/videos/'+slidesObject.backgroundVideoName);
                slidesContainer.setAttribute('data-background-video-loop', 'data-background-video-loop');
                slidesContainer.setAttribute('data-background-video-muted', 'data-background-video-muted');
                break
        }
        slidesContainer.dataset.transition = slidesObject.transition
        let arraySlidesContent = slidesObject.lyrics.split('\n\n')
        let formatArrayContent = arraySlidesContent.map(verse => {
            return '## ' + verse.split('\n').join('<br>')
        })

        labelSlidesContent.innerHTML = formatArrayContent.join('\n---\n')

    }
}

// Reveal.js setup
Reveal.initialize({
    // Special markdown slides
    plugins: [RevealMarkdown],
    // Display embebed content
    embedded: false,
    // Display arrow controls
    controls: false,
    // Display progress bar
    progress: false,
    // Transition speed
    // transitionSpeed: 'slow'
    // Hide arrow cursor
    hideCursorTime: 3000,
    // Margin around text
    margin: -0.25,
});