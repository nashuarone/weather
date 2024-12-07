import { weather } from './data'
import pauseIcon from './assets/icons/pause.svg'
import './index.scss'

const audio = document.getElementById('audio') as HTMLAudioElement
const rangeInputs = document.querySelector('input[type="range"]') as HTMLInputElement
const body = document.querySelector('body') as HTMLBodyElement
const btns = document.querySelectorAll('.bnt')

function handleInputChange(e: Event) {
    let target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.type !== 'range') {
        target = document.getElementById('range') as HTMLInputElement
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = ((+val - +min) * 100) / (+max - +min) + '% 100%'

    audio.volume = +target.value / 100
}

rangeInputs.addEventListener('input', handleInputChange)

let currentWeather: string | null = null
let pause = false

const handleBtnClick = (e: HTMLButtonElement): void => {
    pause = !pause
    audio.pause()
    e.firstElementChild.setAttribute('src', pauseIcon)

    if (currentWeather !== e.id) {
        pause = false
        currentWeather = e.id
        audio.src = `${weather[currentWeather].sound}`
        body.style.backgroundImage = `url(${weather[currentWeather].weatherBg})`
    }

    btns.forEach((b) => {
        if (b.id !== currentWeather) {
            b.firstElementChild.setAttribute('src', `${weather[b.id].icon}`)
        }
    })

    if (!pause) {
        audio.play()
    } else {
        audio.pause()
        e.firstElementChild.setAttribute('src', `${weather[currentWeather].icon}`)
    }
}

btns.forEach((b) => {
    b.addEventListener('click', () => handleBtnClick(b as HTMLButtonElement))
    const itemIcon = document.createElement('img')
    itemIcon.setAttribute('height', '50')
    itemIcon.setAttribute('width', '50')
    itemIcon.src = weather[b.id].icon
    b.append(itemIcon)
})
