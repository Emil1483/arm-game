import { Vector } from 'vector2d'

const canvas = document.querySelector('canvas')!
const c = canvas.getContext('2d')!

canvas.width = innerWidth
canvas.height = innerHeight

class Arm {
    private pos: Vector
    private length: number
    private angle: number

    constructor(pos: Vector, length: number, angle: number) {
        this.pos = pos
        this.length = length
        this.angle = angle
    }

    show() {
        const len = new Vector(Math.cos(this.angle), Math.sin(this.angle))
        const end = this.pos.add(len.multiplyByScalar(this.length))

        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y)
        c.lineTo(end.x, end.y)
        c.stroke()
    }
}

const arm = new Arm(
    new Vector(canvas.width / 2, canvas.height / 2),
    100,
    0,
)

console.log(arm)

arm.show()