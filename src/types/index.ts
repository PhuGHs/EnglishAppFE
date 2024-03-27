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
    DetailChat: undefined;
    EngComRooms: undefined;
    CreateARoom: undefined;
    RoomDetails: undefined;
    TopicScreen: undefined;
    TopicDetails: undefined;
    ShortStories: undefined;
    StoryDetails: undefined;
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

export type TParticipant = {
    participantId: string;
    user: TUser;
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
