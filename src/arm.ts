import { Vector } from 'vector2d'
import { pressing } from './main'

export class Arm {
    public child: Arm | undefined
    private targetSpeed = 0
    private currentSpeed = 0
    private acceleration = 0.04

    constructor(public pos: Vector, private length: number, private angle: number, private speed: number,
        private increaseAngleChar: string, private decreaseAngleChar: string, child: Arm | undefined) {
        this.pos = pos
        this.length = length
        this.angle = angle

        child?.pos.add(this.end)
        this.child = child
    }

    get end(): Vector {
        const len = new Vector(Math.cos(this.angle), Math.sin(this.angle))
        const end = this.pos.clone().add(len.multiplyByScalar(this.length))
        return new Vector(end.x, end.y)
    }

    get totalLength(): number {
        let result = this.length
        let currentChild = this.child
        while (currentChild) {
            result += currentChild.length
            currentChild = currentChild.child
        }
        return result
    }

    update() {
        if (pressing(this.increaseAngleChar)) {
            this.targetSpeed = -this.speed
        }

        if (pressing(this.decreaseAngleChar)) {
            this.targetSpeed = this.speed
        }

        if (!pressing(this.increaseAngleChar) && !pressing(this.decreaseAngleChar)) {
            this.targetSpeed = 0
        }

        const speedDiff = this.targetSpeed - this.currentSpeed
        this.currentSpeed += speedDiff * this.acceleration

        this.angle += this.currentSpeed
        if (this.child) this.child!.angle += this.currentSpeed

        this.child?.pos.subtract(this.child.pos)
        this.child?.pos.add(this.end)

        this.child?.update()
    }

    show(c: CanvasRenderingContext2D) {
        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y)
        c.lineTo(this.end.x, this.end.y)
        c.strokeStyle = 'white'
        c.lineWidth = 10
        c.lineCap = "round"
        c.stroke()

        this.child?.show(c)
    }
}