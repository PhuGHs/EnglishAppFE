export type TLevel = {
    levelId: number;
    levelName: string;
    description: string;
};

export type TUser = {
    userId: number;
    level: TLevel;
    fullName: string;
    gender: string;
    quote: string;
    profilePicture: string;
    followingCount: string;
    followersCount: string;
    createdAt: string;
    updatedAt: string;
};

export type TUser1 = {
    id: number;
    fullName: string;
    avatar: string;
};

export type TParticipant = {
    id: number;
    user: TUserNecessary;
    joinTime: string;
    isSpeaker: boolean;
    isOwner: boolean;
};

export type TConversation = {
    id: number;
    roomName: string;
    lastMessage: TMessage;
    lastSentUser: TUserNecessary;
};

export type TTopic = {
    topicId: number;
    level: TLevel;
    header: string;
    content: string;
};

export type TEngComRooms = {
    roomId: number;
    topic: TTopic;
    owner: TParticipant;
    maxParticipants?: number;
    roomName?: string;
    createdAt: Date;
    ScheduledTo?: Date;
};

export type TEnglishLevel = {
    levelId: number;
    levelName: string;
    description: string;
};

export type TEnglishTopic = {
    topicId: number;
    header: string;
    content: string;
    englishLevelId: number;
};

export type TUserNecessary = {
    user_id: number;
    full_name: string;
    profile_picture: string;
    english_level: TEnglishLevel;
};

export type TEngcomAsk = {
    id: number;
    user: TUserNecessary;
    title: string;
    topic: TEnglishTopic;
    numberOfAnswers: number;
    createdAt: string;
    updatedAt: string;
};

export type TMission = {
    missionId: number;
    missionName: string;
    pointsAwarded: number;
    maxCompletionCount: number;
};

export type TUserMission = {
    id: number;
    user: TUserNecessary;
    mission: TMission;
    isCompleted: boolean;
    completionCount: number;
};

export type TLearningRoom = {
    id: number;
    roomName: string;
    createdAt: string;
    scheduledTo?: string;
    maxParticipants: number;
    duration: number;
    isLive: boolean;
    isPrivate: boolean;
    topic: TEnglishTopic;
    participants: TParticipant[];
};

export type TRole = {
    roleId: number;
    roleName: 'ADMIN' | 'LEARNER';
};

export type TAccount = {
    account_id: number;
    user: TUserNecessary;
    role: TRole;
    email: string;
    is_active: boolean;
};

export type RegisterDto = {
    email: string;
    password: string;
    confirmedPassword: string;
    fullName: string;
    isMale: boolean;
};

export type LoginDto = {
    email: string;
    password: string;
};

export type ApiResponse = {
    status: 'FAIL' | 'SUCCESS';
    message: string;
    data: unknown;
};

export type AuthResponse = {
    accessToken: string;
    account: ApiResponse;
};

export type TInterestPutDto = {
    user_id: number;
    interests: Array<number>;
};

export type TInterest = {
    interest_id: number;
    interest_name: string;
};

export type TInterest2 = {
    interestId: number;
    interestName: string;
};

export type TUserProfile = {
    user_id: number;
    full_name: string;
    gender: boolean;
    profile_picture: string;
    following_count: number;
    followers_count: number;
    reviews_count: number;
    star: number;
    english_level_name: string;
    interests: TInterest2[];
};

export type TReview = {
    review_id: number;
    user_who_was_reviewed: TUserNecessary;
    user_who_reviewed: TUserNecessary;
    star: number;
    comment: string;
    createdAt: string;
};

export type TPostMessage = {
    message_room_id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    is_read: boolean;
    image: string;
};

export type TMessage = {
    message_id: number;
    message_room_id: number;
    sender: TUserNecessary;
    receiver: TUserNecessary;
    message: string;
    is_read: boolean;
    created_at: string;
    image: string;
};

export type MessageRoomDto = {
    message_room_id: number;
    room_name: string;
    last_message: TMessage;
    user: TUserNecessary;
};

export type TConversationTransfer = {
    roomId: number;
    full_name: string;
    receiver_id: number;
    profile_picture: string;
};

export type TSearch = {
    id: number;
    fullName: string;
    gender: boolean;
    quote: string;
    profilePicture: string;
    followingCount: number;
    followersCount: number;
    englishLevel: string;
    interests: TInterest2;
};

export type TReviewPostDto = {
    user_who_was_reviewed_id: number;
    user_who_reviewed_id: number;
    star: number;
    comment: string;
};
