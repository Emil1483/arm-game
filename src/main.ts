import { Vector } from 'vector2d'
import { Arm } from './arm'

const canvas = document.querySelector('canvas')!
const c = canvas.getContext('2d')!

canvas.width = innerWidth
canvas.height = innerHeight

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

export function pressing(char: string): boolean {
    const index = keysPressed.map((c) => c.toLowerCase()).indexOf(char)
    return index != -1
}

const arm = new Arm(
    new Vector(canvas.width / 2, canvas.height / 2),
    canvas.width / 4,
    0,
    0.01,
    'q', 'w',
    new Arm(
        new Vector(0, 0),
        canvas.height / 4,
        -Math.PI / 4,
        0.015,
        'o', 'p',
        undefined,
    ),
)

function draw() {
    requestAnimationFrame(draw)

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    arm.update()
    arm.show(c)
}

draw()