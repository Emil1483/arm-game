import { Vector } from 'vector2d'
import { Arm } from './arm'
import { Target } from './target'

const canvas = document.querySelector('canvas')!
const modalElement = document.querySelector<HTMLElement>('#modal')!
const startGameButton = document.querySelector('#startGame')!

const c = canvas.getContext('2d')!

canvas.width = innerWidth
canvas.height = innerHeight

export const width = canvas.width
export const height = canvas.height

const keysPressed: Array<string> = []

addEventListener('keydown', (event) => {
    const index = keysPressed.indexOf(event.key)
    if (index == -1) {
        keysPressed.push(event.key)
    }
})
addEventListener('keyup', (event) => {
    const index = keysPressed.indexOf(event.key)
    keysPressed.splice(index, 1)
})

startGameButton.addEventListener('click', () => {
    modalElement.style.display = 'none'
})

export function pressing(char: string): boolean {
    const index = keysPressed.map((c) => c.toLowerCase()).indexOf(char)
    return index != -1
}

const arm = new Arm(
    new Vector(width / 2, height / 2),
    width / 4,
    0,
    0.01,
    'q', 'w',
    new Arm(
        new Vector(0, 0),
        height / 4,
        -Math.PI / 4,
        0.015,
        'o', 'p',
        undefined,
    ),
)

const target = new Target('red', 10, arm)

function draw() {
    requestAnimationFrame(draw)

    c.fillStyle = 'black'
    c.fillRect(0, 0, width, height)

    arm.update()
    arm.show(c)

    target.update(arm)
    target.show(c)
}

draw()