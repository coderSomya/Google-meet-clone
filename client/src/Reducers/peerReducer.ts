import {ADD_PEER, REMOVE_PEER} from "../Actions/peerAction.ts";

export type PeerState = Record<string, {stream: MediaStream}>;

type PeerAction = {
    type: typeof ADD_PEER,
    payload: {peerid: string, stream: MediaStream}
} | {
    type: typeof REMOVE_PEER,
    payload: {peerid: string}
}


export const peerReducer = (state: PeerState, action: PeerAction) =>{
    switch(action.type){
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerid]:{
                    stream: action.payload.stream
                }
            }
        case REMOVE_PEER:
            return {...state} ;    

        default:
            return {...state} 

    }
}