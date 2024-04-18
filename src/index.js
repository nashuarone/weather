import { weather } from './data'
import pauseIcon from './assets/icons/pause.svg'
import './index.scss'

const audio = document.getElementById('audio')
const rangeInputs = document.querySelector('input[type="range"]')
const body = document.querySelector('body')
const btn = document.querySelectorAll('.bnt')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'

    audio.volume = target.value / 100
}

rangeInputs.addEventListener('input', handleInputChange)

let currentWeather = null
let pause = false

const handleBtnClick = (e) => {
    pause = !pause
    audio.pause()
    e.firstElementChild.setAttribute('src', pauseIcon)

    if (currentWeather !== e.id) {
        pause = false
        currentWeather = e.id
        audio.src = `${weather[currentWeather].sound}`
        body.style.backgroundImage = `url(${weather[currentWeather].weatherBg})`
    }

    btn.forEach((b) => {
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

btn.forEach((b) => {
    b.addEventListener('click', () => handleBtnClick(b))
    const itemIcon = document.createElement('img')
    itemIcon.setAttribute('height', '50')
    itemIcon.setAttribute('width', '50')
    itemIcon.src = weather[b.id].icon
    b.append(itemIcon)
})
