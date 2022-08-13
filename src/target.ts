import { Vector } from "vector2d";
import { Arm } from './arm';
import { height, width } from "./main";

export class Target {
    private pos: Vector
    constructor(private color: string, private radius: number, arm: Arm) {
        this.pos = this.generatePos(arm)
    }

    touching(arm: Arm): boolean {
        let armToTouch = arm
        while (armToTouch.child) {
            armToTouch = armToTouch.child
        }

        return armToTouch.end.subtract(this.pos).lengthSq() < this.radius * this.radius
    }

    generatePos(arm: Arm): Vector {
        let pos
        while (!pos || arm.pos.distance(pos) > arm.totalLength) {
            pos = new Vector(Math.random() * width, Math.random() * height)
        }
        return pos
    }

    update(arm: Arm) {
        if (this.touching(arm)) {
            this.pos.subtract(this.pos)
            this.pos.add(this.generatePos(arm))
        }
    }

    show(c: CanvasRenderingContext2D) {
        c.beginPath()
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }
}