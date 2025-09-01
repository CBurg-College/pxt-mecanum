enum Move {
    //% block="forward"
    //% block.loc.nl="voren"
    Forward,
    //% block="backward"
    //% block.loc.nl="achteren"
    Backward,
    //% block="to the left"
    //% block.loc.nl="links"
    Left,
    //% block="to the right"
    //% block.loc.nl="rechts"
    Right
}

namespace CMecanum {

    /* calibrated values for wheel configuration:
                \\ --- //
                   ---
                   ---
                // --- \\
    */
    let SF = [17, 15, 15, 15]      // speed forward
    let SB = [-17, -15, -15, -15]  // speed backward
    let SL = [-18, 18, 13, -15]    // speed left
    let SR = [22, -18, -15, 15]    // speed right
    let SC = [15, -15, 15, -15]    // speed clockwise
    let SA = [-15, 15, -15, 15]    // speed anticlockwise
    let SPEED = [0, 0, 0, 0]

    export function calibrateMove(move: Move, frontleft: number, frontright: number, rearleft: number, rearright: number) {
        switch (move) {
            case Move.Forward:
                SF[0] = frontleft; SF[1] = frontright;
                SF[2] = rearleft; SF[3] = rearright;
                break;
            case Move.Backward:
                SB[0] = frontleft; SB[1] = frontright;
                SB[2] = rearleft; SB[3] = rearright;
                break;
            case Move.Left:
                SC[0] = frontleft; SC[1] = frontright;
                SC[2] = rearleft; SC[3] = rearright;
                break;
            case Move.Right:
                SA[0] = frontleft; SA[1] = frontright;
                SA[2] = rearleft; SA[3] = rearright;
                break;
        }
    }

    export function calibrateRotation(spin: Spin, frontleft: number, frontright: number, rearleft: number, rearright: number) {
        switch (spin) {
            case Spin.Clockwise:
                SC[0] = frontleft; SC[1] = frontright;
                SC[2] = rearleft; SC[3] = rearright;
                break;
            case Spin.AntiClockwise:
                SA[0] = frontleft; SA[1] = frontright;
                SA[2] = rearleft; SA[3] = rearright;
                break;
        }
    }

    export function move(dir: Move) {
        switch (dir) {
            case Move.Forward:
                Nezha.fourWheelSpeed(SF[0], SF[1], SF[2], SF[3]);
                break;
            case Move.Backward:
                Nezha.fourWheelSpeed(SB[0], SB[1], SB[2], SB[3]);
                break;
            case Move.Left:
                Nezha.fourWheelSpeed(SL[0], SL[1], SL[2], SL[3]);
                break;
            case Move.Right:
                Nezha.fourWheelSpeed(SR[0], SR[1], SR[2], SR[3]);
                break;
        }
    }

    export function rotate(rotation: Spin) {
        if (rotation == Spin.Clockwise)
            Nezha.fourWheelSpeed(SC[0], SC[1], SC[2], SC[3])
        else
            Nezha.fourWheelSpeed(SA[0], SA[1], SA[2], SA[3])
    }
}
