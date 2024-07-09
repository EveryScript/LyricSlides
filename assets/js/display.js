let tabLyrics = document.getElementById('tab-lyrics')
let tabBackgs = document.getElementById('tab-backgs')
let tabElements = document.getElementsByClassName('tab-element')
let btnTransitions = document.getElementById('pr-btn-transition')
let navToogleTheme = document.getElementById('nav-toogle-theme')
let navAbout = document.getElementById('nav-about')
let modalAbout = document.getElementById('modal-about')
let btnCloseModal = document.getElementById('btn-close-modal')
let DARK_MODE_THEME = false

// Set local color theme
let colorTheme = localStorage.getItem('color-theme')
if (colorTheme) {
    colorTheme === 'dark' ? changeColorTheme(!DARK_MODE_THEME) : changeColorTheme(DARK_MODE_THEME)
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    changeColorTheme(!DARK_MODE_THEME)
} else {
    changeColorTheme(DARK_MODE_THEME)
}
// Show modal about
navAbout.addEventListener('click', () => modalAbout.classList.remove('modal-hide'))

// Hide modal about
btnCloseModal.addEventListener('click', () => modalAbout.classList.add('modal-hide'))

// Tabs switch
tabLyrics.addEventListener('click', () => {
    clearTabActiveClass()
    tabLyrics.classList.add('tab-active')
    document.getElementById('lyrics-area').style.display = 'block'
    document.getElementById('backgs-area').style.display = 'none'
})

tabBackgs.addEventListener('click', () => {
    clearTabActiveClass()
    tabBackgs.classList.add('tab-active')
    document.getElementById('backgs-area').style.display = 'grid'
    document.getElementById('lyrics-area').style.display = 'none'
})

// Btn list select
btnTransitions.addEventListener('click', () => {
    // listSelectTransitions.classList.toggle('list-active')
    document.getElementById('pr-list').classList.add('list-active')
})

// Nav toogle color theme
navToogleTheme.addEventListener('click', () => {
    let colorTheme = localStorage.getItem('color-theme')
    colorTheme === 'dark' ? changeColorTheme(false) : changeColorTheme(true)
})

function changeColorTheme(darkModeFlag) {
    let containerTag = document.getElementsByClassName('container')[0]
    if (darkModeFlag) {
        navToogleTheme.innerHTML = '<i class="fa-solid fa-sun"></i>'
        localStorage.setItem('color-theme', 'dark')
        containerTag.style.colorScheme = 'dark'
        containerTag.classList.add('dark-mode')
    } else {
        navToogleTheme.innerHTML = '<i class="fa-solid fa-moon"></i>'
        localStorage.setItem('color-theme', 'light')
        containerTag.style.colorScheme = 'light'
        containerTag.classList.remove('dark-mode')
    }
}

// Functions
function clearTabActiveClass() {
    for (const tabElement of tabElements) {
        tabElement.classList.remove('tab-active')
    }
}