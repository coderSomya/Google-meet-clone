export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

export const addPeerAction = (peerid: string, stream: MediaStream) =>({
    type: ADD_PEER,
    payload: {peerid, stream}
})

export const removePeerAction = (peerid: string) =>({
    type: REMOVE_PEER,
    payload: {peerid}
})