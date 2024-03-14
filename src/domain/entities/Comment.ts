export type CommentProps = {
    id: string;
    userId: string;
    postId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
};

export class Comment {
    public readonly id: string;
    public readonly userId: string;
    public readonly postId: string;
    public readonly text: string;
    public readonly createdAt: string;
    public readonly updatedAt: string;

    constructor(props: CommentProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.postId = props.postId;
        this.text = props.text;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
