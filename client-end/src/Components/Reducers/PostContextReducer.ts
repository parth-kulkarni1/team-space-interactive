import { act } from "@testing-library/react"
import { imageType, PostEdit, postStructure, postStructureEdit, postUser, reaction, reply } from "../Contexts/PostContext"
import { CurrentAction, CurrentState} from "../Contexts/PostContext"

export function postReducer(state: CurrentState, action: CurrentAction): CurrentState{
    switch(action.type){
        case 'allPosts':{
            return {...state, post: action.payload as postStructure[]}
        }

        case 'body':
            return {...state, ownPost: {...state.ownPost, body: action.payload as string}}

        case true:
            return {...state, show: action.payload as boolean}

        case false:
            return {...state, show: action.payload as boolean}

        case 'title':
            return {...state, ownPost: {...state.ownPost, title: action.payload as string}}

        case 'resetPost':

             const reset_own_post = action.payload as postUser

            return {...state, ownPost: {...state.ownPost, title: reset_own_post.title, body: reset_own_post.body, images: reset_own_post.images
                                        , userId: reset_own_post.userId}}

        case 'image':
            return {...state, ownPost: {...state.ownPost, images: action.payload as string[]}}

        
        case 'cloudinaryimage': 
            return {...state, edit: {...state.edit, post : {...state.edit.post, photo: action.payload as imageType[]}}}

        case 'edit':

            return {...state, edit : {...state.edit, status: true, post: action.payload as postStructureEdit}

        }

        case 'reset':

            const reset_edit_post = action.payload as PostEdit

            return {...state, edit: {...state.edit, status: reset_edit_post.status, post: reset_edit_post.post, imageHandling: reset_edit_post.imageHandling}}


        case 'localPost': 

            return {...state, post: [action.payload as postStructure, ...state.post]}

        case 'updateEdited':
            const payload = action.payload as postStructure

            return {...state, post: [payload, ...state.post.filter(post => post.post_id !== payload.post_id)]}

        case 'addDeleted':

            return{...state, edit: {...state.edit, imageHandling: {...state.edit.imageHandling, deletedImages: [...state.edit.imageHandling.deletedImages, action.payload as string]}}}

        case 'deletePost': 
            
        const deleted_post = action.payload as postStructure
    
            return {...state, post: [...state.post.filter(post => post !== deleted_post)]} // This removes the post from local state

        case 'viewReplies' : 


            return {...state, reply: action.payload as boolean}

        
        case 'currentPost' : 
            return {...state, currentPost: action.payload as postStructure}

        
        case 'addReply':

          return {...state, currentPost: {...state.currentPost, reply: [ action.payload as reply, ...state.currentPost.reply]
                    
          }}

        
        case 'replyOwner':
            return {...state, currentReplyOwner: action.payload as reply}

        case 'addChildReply': 

        const replyObj = action.payload as reply


            return{...state, currentPost: {...state.currentPost, reply: state.currentPost.reply.map((element) => ({
            
                       ...element,
                        childComments: element.childComments.map((comment) => replyObj.parentComment.id === comment.id ?
                            {...comment, childComments: [...comment.childComments, action.payload as reply]} : comment
                        
                            
                        
            )}))}}

        case 'addParentReply': 

            const replyObjParent = action.payload as reply

            return {...state, currentPost: {...state.currentPost, reply: state.currentPost.reply.map((element) => element.id === replyObjParent.parentComment.id ? {...element, childComments: [...element.childComments, replyObjParent as reply] } : element) 



            }}

        case 'deleteReplyParent':

            const deletedReplyObj = action.payload as reply

            return {...state, currentPost: {...state.currentPost, reply: [...state.currentPost.reply.filter(reply => reply.id !== deletedReplyObj.id)]}}

        case 'deleteReplyChild': 

            const deletedReplyObjChild = action.payload as reply

            return{...state, currentPost: {...state.currentPost, reply: state.currentPost.reply.map((element) => ({
                    
                    ...element,
                    childComments: element.childComments.filter(reply => reply.id !== deletedReplyObjChild.id).map((next) => ({
                        ...next,
                        childComments: next.childComments.filter(reply => reply.id !== deletedReplyObjChild.id)
                    }))

                
            }))}}

        
        case 'editReply':
            return {...state, editReply: action.payload as string}


        case 'incrementLike':
            const likePost = action.payload as postStructure
            return {...state, post: [...state.post.map((element) => element.post_id === likePost.post_id ? {
                ...element, 
                likeCount: element.likeCount + 1
            }

            :

            element    )
        ]}


        case 'addLikeReaction': 
            const likePostReactionObj = action.payload as reaction

            return{...state, post: [...state.post.map((element) => element.post_id === likePostReactionObj.post.post_id ? 
                {
                ...element,reaction: [...element.reaction, likePostReactionObj]} 
                :
                element )
            ]}

        case 'addHeartReaction': 
            const heartPostReactionObj = action.payload as reaction

            return{...state, post: [...state.post.map((element) => element.post_id === heartPostReactionObj.post.post_id ? 
                {
                ...element,reaction: [...element.reaction, heartPostReactionObj]} 
                :
                element )
            ]}



        case 'incrementHeart':

            const heartPost = action.payload as postStructure
                return {...state, post: [...state.post.map((element) => element.post_id === heartPost.post_id ? {
                    ...element, 
                    heartsCount: element.heartsCount + 1
                }

                :

                element    )
            ]}


        case 'decrementHeart':

            const heartPostRemoved = action.payload as postStructure
                return {...state, post: [...state.post.map((element) => element.post_id === heartPostRemoved.post_id ? {
                    ...element, 
                    heartsCount:  element.likeCount > 0 ? element.likeCount - 1 : 0,
                }

                :

                element    )
            ]}

        case 'decrementLike': 

            const likePostRemoved = action.payload as reaction
            return {...state, post: [...state.post.map((element) => element.post_id === likePostRemoved.post.post_id ? {
                ...element, 
                likeCount: element.likeCount > 0 ? element.likeCount - 1 : 0,
                reaction: element.reaction.filter(reaction => reaction.id !== likePostRemoved.id)
            }

            :

            element    )
        ]}
            



                
    
        default :
        return state
    }

}
