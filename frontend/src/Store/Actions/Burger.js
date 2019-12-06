export const BURGER_ON = 'BURGER_ON'
export const BURGER_OFF = 'BURGER_OFF'

export function burgerOn() {
    return { type: BURGER_ON, 'on' }
}

export function burgerOff(){
    return {type: BURGER_OFF, 'off'}
}