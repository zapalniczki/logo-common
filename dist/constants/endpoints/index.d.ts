declare const ENDPOINTS: {
    readonly ADMINS: {
        readonly getDetails: "/Admins/getDetails";
    };
    readonly AUTH: {
        readonly signIn: "/Auth/signIn";
        readonly confirmRegistration: "/Auth/confirmRegistration";
    };
    readonly COHORTS: {
        readonly getAll: "/Cohorts/getAll";
    };
    readonly GROUPS: {
        readonly getAll: "/Groups/getAll";
    };
    readonly KPIS: {
        readonly getOverview: "/Kpis/getOverview";
    };
    readonly QUIZES: {
        readonly getAll: "/Quizes/getAll";
        readonly getDetails: "/Quizes/getDetails";
        readonly getQuestions: "/Quizes/getQuestions";
        readonly getCategories: "/Quizes/getCategories";
    };
    readonly QUIZ_ASSIGNMENTS: {
        readonly addNew: "/quiz-assignments/addNew";
        readonly getAll: "/quiz-assignments/getAll";
        readonly getDetails: "/quiz-assignments/getDetails";
        readonly getProgress: "/quiz-assignments/getProgress";
    };
    readonly QUIZ_ATTEMPTS: {
        readonly getAll: "/Attempts/getAll";
        readonly getDetails: "/Attempts/getDetails";
        readonly start: "/Attempts/start";
        readonly getQuestion: "/Attempts/getQuestion";
        readonly getAnswers: "/Attempts/getAnswers";
        readonly checkAnswer: "/Attempts/checkAnswer";
        readonly getSummary: "/Attempts/getSummary";
        readonly complete: "/Attempts/complete";
        readonly getReview: "/Attempts/getReview";
        readonly getSkeleton: "/Attempts/getSkeleton";
        readonly addNew: "/Attempts/addNew";
    };
    readonly QUIZ_INSTANCES: {
        readonly getAll: "/QuizInstances/getAll";
        readonly getQuestions: "/QuizInstances/getQuestions";
        readonly getDetails: "/QuizInstances/getDetails";
    };
    readonly SCHOOLS: {
        readonly getDetails: "/Schools/getDetails";
        readonly getAll: "/Schools/getAll";
        readonly addNew: "/Schools/addNew";
    };
    readonly STATISTICS: {
        readonly getProgress: "/statistics/getProgress";
        readonly getSubmissions: "/statistics/getSubmissions";
    };
    readonly STUDENTS: {
        readonly getDetails: "/Students/getDetails";
        readonly getAll: "/Students/getAll";
        readonly addNew: "/Students/addNew";
    };
    readonly TEACHERS: {
        readonly getDetails: "/Teachers/getDetails";
        readonly getAll: "/Teachers/getAll";
        readonly addNew: "/Teachers/addNew";
    };
    readonly TEMP: {
        readonly addData: "/Temp/addData";
        readonly removeAll: "/Temp/removeAll";
    };
};
export default ENDPOINTS;
