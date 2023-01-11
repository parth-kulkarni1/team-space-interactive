export type PostInfo = {
    title: string, 
    body: string,
    userId: number

}

export type PostResponse = {
    'created': string
}

export type getAllPostsResponse = {
    posts: {title: string, body: string, post_id: number, userId: number}
}