export type PostProps = {
    id: string;
    userId: string;
    title: string;
    text: string;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
};

export class Post {
    public readonly id: string;
    public readonly userId: string;
    public readonly text: string;
    public readonly commentsCount: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(props: PostProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.text = props.text;
        this.commentsCount = props.commentsCount;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
