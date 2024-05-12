import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Interest: undefined;
    EnglishTest: undefined;
    QuestionsScreen: undefined;
    HomeScreen: undefined;
    Tabs: undefined;
    LearnersTab: undefined;
    EngComAskScreen: undefined;
    AskAQuestion: undefined;
    DetailChat: { roomId: number };
    EngComRooms: undefined;
    CreateARoom: undefined;
    RoomDetails: undefined;
    TopicScreen: undefined;
    TopicDetails: undefined;
    ShortStories: undefined;
    StoryDetails: undefined;
    LeaderBoard: undefined;
    MissionScreen: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type InterestScreenProps = NativeStackScreenProps<RootStackParamList, 'Interest'>;
export type EnglishTestScreenProps = NativeStackScreenProps<RootStackParamList, 'EnglishTest'>;
export type QuestionsScreenProps = NativeStackScreenProps<RootStackParamList, 'QuestionsScreen'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
export type TabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
export type EngComAskScreenProps = NativeStackScreenProps<RootStackParamList, 'EngComAskScreen'>;
export type AskAQuestionScreenProps = NativeStackScreenProps<RootStackParamList, 'AskAQuestion'>;
export type DetailChatScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailChat'>;
export type EngComRoomsScreenProps = NativeStackScreenProps<RootStackParamList, 'EngComRooms'>;
export type CreateARoomScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateARoom'>;
export type RoomDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomDetails'>;
export type TopicScreenProps = NativeStackScreenProps<RootStackParamList, 'TopicScreen'>;
export type TopicDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'TopicDetails'>;
export type ShortStoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'ShortStories'>;
export type StoryDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'StoryDetails'>;
export type LeaderBoardScreenProps = NativeStackScreenProps<RootStackParamList, 'LeaderBoard'>;
export type MissionScreenProps = NativeStackScreenProps<RootStackParamList, 'MissionScreen'>;

export type BottomTabParamList = {
    Home: undefined;
    Chat: undefined;
    Learners: undefined;
    Skills: undefined;
    Profile: undefined;
};

export type LearnersTopTabParamList = {
    Level: undefined;
    Recommendations: undefined;
};

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
    id: number,
    fullName: string,
    avatar: string
}

export type TParticipant = {
    participantId: string;
    user: TUser;
};

export type TConversation = {
    id: number;
    lastMessage: string;
    lastSentUser: TUser1;
}

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
    conversation: TConversation;
    id: number;
    user: TUser1;
    message: string;
    createdAt: Date
}

export type TEnglishLevel = {
    levelId: number;
    levelName: string;
    description: string;
}

export type TEnglishTopic = {
    topicId: number;
    header: string;
    content: string;
    englishLevelId: number;
}

export type TUserNecessary = {
    userId: number;
    fullName: string;
    profilePicture: string;
    englishLevel: TEnglishLevel
}

export type TEngcomAsk = {
    id: number;
    user: TUserNecessary;
    title: string;
    topic: TEnglishTopic;
    numberOfAnswers: number;
    createdAt: string;
    updatedAt: string;
}

export type TMission = {
    missionId: number;
    missionName: string;
    pointsAwarded: number;
    maxCompletionCount: number;
}

export type TUserMission = {
    id: number;
    user: TUserNecessary;
    mission: TMission;
    isCompleted: boolean;
    completionCount: number;
}
