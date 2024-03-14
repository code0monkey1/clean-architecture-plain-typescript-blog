import { ObjectId } from "mongoose";

export const objectIdToString = (objectId: ObjectId): string =>
    objectId.toString();

export const mapDocument = (document: any): any => {
    const { _id: objectId, ...rest } = document;
    delete rest.__v;
    const id = objectIdToString(objectId);
    return { ...rest, id };
};
