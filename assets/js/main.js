import { MAX_LENGTH_LYRICS } from './global.js'

let btnSend = document.getElementById('btn-send-info')
let btnSendTab = document.getElementById('btn-send-info-tab')
let btnClear = document.getElementById('btn-clear-info')
let inputTextLyrics = document.getElementById('input-text')
let inputColorSlides = document.getElementById('input-color')
let inputImageRadio = document.getElementsByName('input-image')
let selectTransitionSlides = document.getElementById('input-transition')
let labelSlidesContent = document.getElementById('content-preview')
let listSelectElements = document.getElementsByClassName('pr-list-element')
let lyricsCounterChar = document.getElementById('lyrics-counter')
let btnClipboard = document.getElementById('btn-clipboard')
let msgEmptySlide = document.getElementById('msg-empty')
// let inputImageBackg = document.getElementById('input-image')

let SLIDES_OBJECT = {
    lyrics: '',
    transition: 'slide',
    backgroundType: 'color',
    backgroundName: '#484848',
    backgroundVideoName: ''
}

checkLocalContent()


// Check radio image selected
for (let inputImage of inputImageRadio) {
    inputImage.addEventListener('change', e => {
        // SLIDES_OBJECT.backgroundType = 'image'
        SLIDES_OBJECT.backgroundType = e.target.dataset.bgtype
        SLIDES_OBJECT.backgroundName = e.target.value
        SLIDES_OBJECT.backgroundVideoName = e.target.dataset.bgvideo
        console.log(e.target.dataset.bgvideo)
        let allSlideTags = document.getElementsByClassName('preview-slide')
        for (let slideTag of allSlideTags) {
            slideTag.style.backgroundSize = 'cover'
            slideTag.style.backgroundPosition = 'center'
            slideTag.style.backgroundImage = `url('../assets/img/${e.target.value}')`
        }
    })
}

// Select element in list transitions
for (const listElement of listSelectElements) {
    listElement.addEventListener('click', () => {
        SLIDES_OBJECT.transition = listElement.dataset.transition
        document.getElementById('pr-btn-transition').innerText = listElement.innerText
        document.getElementById('pr-list').classList.remove('list-active')
    })
}

// Check and set values from localstorage
function checkLocalContent() {
    let slidesLocalContent = localStorage.getItem('slides-content')
    if (slidesLocalContent) {
        SLIDES_OBJECT = JSON.parse(slidesLocalContent)
        inputTextLyrics.textContent = SLIDES_OBJECT.lyrics
        document.getElementById('pr-btn-transition').innerText = SLIDES_OBJECT.transition
        writeAndPreviewLyrics(SLIDES_OBJECT.lyrics, SLIDES_OBJECT.backgroundType, SLIDES_OBJECT.backgroundName)
    } else {
        inputTextLyrics.value = ''
    }
}

// Paste text from clipboard
btnClipboard.addEventListener('click', async () => {
    try {
        const clipboardText = await navigator.clipboard.readText()
        if (clipboardText.length < MAX_LENGTH_LYRICS) {
            inputTextLyrics.value = clipboardText
            labelSlidesContent.innerHTML = ''
            SLIDES_OBJECT.lyrics = inputTextLyrics.value
            writeAndPreviewLyrics(inputTextLyrics.value, SLIDES_OBJECT.backgroundType, SLIDES_OBJECT.backgroundName)
        } else {
            alert('Too many large text')
        }
    } catch (error) {
        alert('Error on paste from clipboard');
    }
})

// Set preview slides on keyup
inputTextLyrics.addEventListener('keyup', e => {
    labelSlidesContent.innerHTML = ''
    SLIDES_OBJECT.lyrics = e.target.value
    writeAndPreviewLyrics(e.target.value, SLIDES_OBJECT.backgroundType, SLIDES_OBJECT.backgroundName)
})

// Show slides in presentation
btnSend.addEventListener('click', () => sendLyricsInfo(false))
// btnSendTab.addEventListener('click', () => sendLyricsInfo(true))

// Clear all tags and content
btnClear.addEventListener('click', function () {
    localStorage.removeItem('slides-content')
    document.getElementById('pr-btn-transition').innerHTML = 'Transition <i class="fa-solid fa-chevron-up"></i>'
    lyricsCounterChar.innerText = '0/' + MAX_LENGTH_LYRICS
    checkLocalContent()
    labelSlidesContent.innerHTML = ''
    inputTextLyrics.value = ''
    inputTextLyrics.focus()
    msgEmptySlide.classList.remove('msg-hide')
})


// Function write and show preview content
function writeAndPreviewLyrics(lyricsText, backgType, backgName) {
    lyricsCounterChar.innerText = lyricsText.length + '/' + MAX_LENGTH_LYRICS
    if (lyricsText.length && lyricsText.length > 0) {
        msgEmptySlide.classList.add('msg-hide')
    } else {
        msgEmptySlide.classList.remove('msg-hide')
    }
    if (lyricsText) {
        let arrayLyricsText = lyricsText.split('\n\n')
        arrayLyricsText.map(verse => {
            let tagP = document.createElement('p')
            tagP.classList.add('preview-slide')
            switch (backgType) {
                case 'color':
                    tagP.style.backgroundColor = backgName
                    tagP.style.backgroundImage = `url('')`
                    break
                case 'image':
                case 'video':
                    tagP.style.backgroundSize = 'cover'
                    tagP.style.backgroundPosition = 'center'
                    tagP.style.backgroundImage = `url('../assets/img/${backgName}')`
                    break
            }
            tagP.append(document.createTextNode(verse))
            labelSlidesContent.appendChild(tagP)
        })
    }
}

// Function send info lyrics to presentation
function sendLyricsInfo(newTabFlag = false) {
    localStorage.setItem('slides-content', JSON.stringify(SLIDES_OBJECT))
    if (newTabFlag)
        window.open('screen.html', '_blank')
    else
        window.location.href = 'screen.html'
}