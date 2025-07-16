//% color="#00CC00" icon="\uf1f9"
//% block="Mecanum wheels"
//% block.loc.nl="Mecanum wielen"
namespace CMecanum {

    export enum Motors {
        //% block="front left"
        //% block.loc.nl="links voor"
        frontLeft,
        //% block="front right"
        //% block.loc.nl="rechts voor"
        frontRight,
        //% block="rear left"
        //% block.loc.nl="links achter"
        rearLeft,
        //% block="rear right"
        //% block.loc.nl="rechts achter"
        rearRight
    }

    export enum Direction {
        // block="forward"
        // block.loc.nl="vooruit"
        Forward,
        // block="reverse"
        // block.loc.nl="achteruit"
        Reverse,
        // block="to the left"
        // block.loc.nl="naar links"
        Left,
        // block="to the right"
        // block.loc.nl="naar rechts"
        Right,
        // block="anti clockwise"
        // block.loc.nl="linksom"
        AClockwise,
        // block="clockwise"
        // block.loc.nl="rechtsom"
        Clockwise
    }

    export enum Steer {
        // block="to the left"
        // block.loc.nl="naar links"
        Left,
        // block="to the right"
        // block.loc.nl="naar rechts"
        Right
     }

    let STEER = 0

    // swap the motor direction because of the assembly
    let SWAPASM = [false, false, false, false]

    // swap the motor speed based on the direction
    //              mfl    mfr    mrl    mrr
    let SWAPFRW = [false, false, true , true ]
    let SWAPREV = [true , true , false, false]
    let SWAPLFT = [true , true , true , true ]
    let SWAPRGT = [false, false, false, false]
    let SWAPCLW = [false, true , true , false]
    let SWAPACW = [true , false, false, true ]

    let MFL = 0
    let MFR = 0
    let MRL = 0
    let MRR = 0

    //% block="Swap the assembly of %motor"
    //% block.loc.nl="Draai de montage van %motor om"
    export function swapDirection(motor: Motors) {
        SWAPASM[motor] = !SWAPASM[motor]
    }

    //% block="steer %bend \\% %dir"
    //% block.loc.nl="stuur %bend \\% %dir"
    //% bend.max=100 bend.min=0
    export function steer(dir: Steer, bend: number) {
        STEER = (dir == Steer.Left ? -bend : bend)
    }

    //% block="run %dir at %speed \\%"
    //% block.loc.nl="rijd %dir met %speed \\% snelheid"
    //% speed.max=100 speed.min=0
    export function setDriving(dir: Direction, speed: number) {
        let swap = [false, false, false, false]
        switch (dir) {
            case Direction.Forward: swap = SWAPFRW; break;
            case Direction.Reverse: swap = SWAPREV; break;
            case Direction.Left: swap = SWAPLFT; break;
            case Direction.Right: swap = SWAPRGT; break;
            case Direction.Clockwise: swap = SWAPCLW; break;
            case Direction.AClockwise: swap = SWAPACW; break;
        }

        if ((STEER != 0) && (dir == Direction.Forward || dir == Direction.Reverse)) {
            if (STEER > 0) {
                let steer = speed - speed * STEER / 100
                MFL = (swap[Motors.frontLeft] ? -speed : speed)
                MRL = (swap[Motors.rearLeft] ? -speed : speed)
                MFR = (swap[Motors.frontRight] ? -speed : steer)
                MRR = (swap[Motors.rearRight] ? -speed : steer)
            }
            else {
                let steer = speed + speed * STEER / 100
                MFL = (swap[Motors.frontLeft] ? -speed : steer)
                MRL = (swap[Motors.rearLeft] ? -speed : steer)
                MFR = (swap[Motors.frontRight] ? -speed : speed)
                MRR = (swap[Motors.rearRight] ? -speed : speed)
            }
        }
        else {
            MFL = (swap[Motors.frontLeft] ? -speed : speed)
            MRL = (swap[Motors.rearLeft] ? -speed : speed)
            MFR = (swap[Motors.frontRight] ? -speed : speed)
            MRR = (swap[Motors.rearRight] ? -speed : speed)
        }

        if (SWAPASM[Motors.frontLeft]) MFL = -MFL
        if (SWAPASM[Motors.frontRight]) MFR = -MFR
        if (SWAPASM[Motors.rearLeft]) MRL = -MRL
        if (SWAPASM[Motors.rearRight]) MRR = -MRR
    }

    //% block="speed front left wheel"
    //% block.loc.nl="snelheid linker voorwiel"
    export function frontLeft(): number {
        return MFL
    }

    //% block="speed front right wheel"
    //% block.loc.nl="snelheid rechter voorwiel"
    export function frontRight(): number {
        return MFR
    }

    //% block="speed rear left wheel"
    //% block.loc.nl="snelheid linker achterwiel"
    export function rearLeft(): number {
        return MRL
    }

    //% block="speed rear right wheel"
    //% block.loc.nl="snelheid rechter achterwiel"
    export function rearRight(): number {
        return MRR
    }
}
