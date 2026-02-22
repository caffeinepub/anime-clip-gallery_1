import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Clip {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    animeName: string;
    category: string;
    videoUrl: string;
    uploadDate: Time;
}
export interface ClipRequest {
    id: bigint;
    status: string;
    title: string;
    description: string;
    animeName: string;
    requesterContact: string;
    requestDate: Time;
}
export type Time = bigint;
export interface backendInterface {
    addClip(title: string, animeName: string, category: string, videoUrl: string, thumbnailUrl: string): Promise<Clip>;
    deleteClip(clipId: bigint): Promise<boolean>;
    deleteClipRequest(requestId: bigint): Promise<boolean>;
    getAllCategories(): Promise<Array<string>>;
    getAllClipRequests(): Promise<Array<ClipRequest>>;
    getAllClips(): Promise<Array<Clip>>;
    getClipsByCategory(category: string): Promise<Array<Clip>>;
    searchClips(searchText: string): Promise<Array<Clip>>;
    submitClipRequest(title: string, animeName: string, description: string, requesterContact: string): Promise<ClipRequest>;
    updateRequestStatus(requestId: bigint, newStatus: string): Promise<ClipRequest | null>;
}
