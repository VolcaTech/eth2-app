export const CHOOSE_SEND_MODE = 'CHOOSE_SEND_MODE';

export function chooseSendMode (mode) {
    console.log(mode)
    return {
        type: CHOOSE_SEND_MODE,
        mode
    }
}
