import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TConversationTransfer, TLearningRoomDto } from './T-type';

export type RootStackParamList = {
    Welcome: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Interest: { userId: number };
    EnglishTest: { userId: number };
    QuestionsScreen: undefined;
    HomeScreen: undefined;
    Tabs: undefined;
    LearnersTab: undefined;
    EngComAskScreen: undefined;
    AskAQuestion: undefined;
    DetailChat: { conversation: TConversationTransfer };
    EngComRooms: undefined;
    CreateARoom: undefined;
    RoomDetails: { room: TLearningRoomDto };
    TopicScreen: { levelId: number };
    TopicDetails: { topicId: number; topicName: string };
    ShortStories: undefined;
    StoryDetails: { shortStoryId: number };
    LeaderBoard: undefined;
    MissionScreen: undefined;
    LearnerComment: { userId: number; username: string };
    ReviewLearner: { userId: number };
    FollowersScreen: { userId: number; type: 'followers' | 'following'; username: string };
    NotificationScreen: undefined;
    DiscussionDetails: { discussionId: number };
    EditProfile: undefined;
    EnglishLevelScreen: undefined;
    EnglishTestListScreen: { levelId: number };
    ReportScreen: undefined;
    ReportDetails: { reportId: number };
    EditShortStory: { shortStoryId?: number; type: 'edit' | 'insert' };
    EditTopic: {
        levelId?: number;
        topicId?: number;
        type?: 'edit' | 'insert';
        screenType?: 'topic' | 'question';
    };
    LevelOptions: { levelId: number };
    SearchScreen: { isProfileSearch: boolean };
    UserProfileScreen: { userId: number };
    UserRecommendation: undefined;
    ReportLearner: { userId: number };
    Ban: undefined;
    Test: { testId: number };
    ResultScreen: { score: number, numberOfQuestions: number, levelName: string, testId: number};
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
export type ReportLearnerScreenProps = NativeStackScreenProps<RootStackParamList, 'ReportLearner'>;
export type BanScreenProps = NativeStackScreenProps<RootStackParamList, 'Ban'>;
export type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>;
export type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultScreen'>;
export type LearnerCommentScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'LearnerComment'
>;
export type ReviewLearnerScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewLearner'>;
export type NotificationScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'NotificationScreen'
>;
export type FollowersScreenProps = NativeStackScreenProps<RootStackParamList, 'FollowersScreen'>;
export type DiscussionDetailsScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'DiscussionDetails'
>;
export type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
export type EnglishLevelScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'EnglishLevelScreen'
>;
export type EnglishTestListScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'EnglishTestListScreen'
>;
export type ReportScreenProps = NativeStackScreenProps<RootStackParamList, 'ReportScreen'>;
export type ReportDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ReportDetails'>;
export type EditShortStoryScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'EditShortStory'
>;
export type EditTopicScreenProps = NativeStackScreenProps<RootStackParamList, 'EditTopic'>;
export type LevelOptionsScreenProps = NativeStackScreenProps<RootStackParamList, 'LevelOptions'>;
export type SearchScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchScreen'>;
export type UserProfileScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'UserProfileScreen'
>;
export type UserRecommendationScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'UserRecommendation'
>;

export type BottomTabParamList = {
    Home: undefined;
    Chat: undefined;
    Learners: undefined;
    Skills: undefined;
    Profile: undefined;
    Report: undefined;
};

export type LearnersTopTabParamList = {
    Level: undefined;
    Recommendations: undefined;
};
