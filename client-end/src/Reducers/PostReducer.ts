
export const initalState: CurrentState = {
    show: false,
    value: '',
    post: {title: '', body: '', userId: 0},
    errors: {title: '', body: ''},
}

interface CurrentState{
    show: boolean
    value: string,
    post: {title: string, body: string, userId: number},
    errors: {title: string, body: string}
}

type Errors = {
    title: string, 
    body: string
}

type CurrentAction = {
   type: true | false | 'add' | 'title' |'errors' | 'resetPost'
   payload: string | boolean | Errors

  }


export function reducer(state: CurrentState, action: CurrentAction): CurrentState{
    switch(action.type){
        case true:
        return {...state, show: action.payload as boolean}

        case false:
            return {...state, show: action.payload as boolean}

        case 'add':
            console.log(action.payload)
            return {...state, post: {...state.post, body: action.payload as string }}

        case 'title':
            return {...state, post: {...state.post, title: action.payload as string}}

        case 'errors':
            return {...state, errors: action.payload as Errors}

        case 'resetPost':
            return {...state, post: {...state.post, title: action.payload as string, body: action.payload as string}}
        
        default:
            return state

    
    }


}

