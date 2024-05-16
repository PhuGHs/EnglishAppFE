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

export type TMessage = {
    conversationId: number;
    id: number;
    sender: TUserNecessary;
    receiver: TUserNecessary
    message: string;
    createdAt: string;
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
    userId: number;
    fullName: string;
    profilePicture: string;
    englishLevel: TEnglishLevel;
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
    participants: TParticipant[]
}

export type TRole = {
    roleId: number;
    roleName: 'ADMIN' | 'LEARNER';
}

export type TAccount = {
    id: number;
    user: TUserNecessary;
    role: TRole;
    email: string;
    isActive: boolean;
}

export type RegisterDto = {
    email: string;
    password: string;
    confirmedPassword: string;
    fullName: string;
    isMale: boolean;
}

export type LoginDto = {
    email: string;
    password: string;
}

export type ApiResponse = {
    status: 'FAIL' | 'SUCCESS';
    message: string;
    data: unknown;
}

export type AuthResponse = {
    accessToken: string;
    account: ApiResponse;
}

export type TInterestPutDto = {
    user_id: number;
    interests: Set<number>
}