import {CONSTANTS} from '../common/constants.js';

export const activitiesTypeConfig = {
    [CONSTANTS.MOVIE]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: false,
        Display: "Movie",
    },
    [CONSTANTS.QUIZ]: {
        [CONSTANTS.SCORE]: true,
        [CONSTANTS.ZOOM]: true,
        Display: "Quiz",
    },
    [CONSTANTS.EASY_QUIZ]: {
        [CONSTANTS.SCORE]: true,
        [CONSTANTS.ZOOM]: true,
        Display: "Easy Quiz",
    },
    [CONSTANTS.CHALLENGE]: {
        [CONSTANTS.SCORE]: true,
        [CONSTANTS.ZOOM]: true,
        Display: "Challenge",
    },
    [CONSTANTS.MAKE_A_MAP]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: true,
        Display: "Make-a-Map",
    },
    [CONSTANTS.MAKE_A_MOVIE]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: true,
        Display: "Make-a-Movie",
    },
    [CONSTANTS.WORDPLAY]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: true,
        Display: "Wordplay",
    },
    [CONSTANTS.RELATED_READING]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: false,
        Display: "Related Reading",
    },
    [CONSTANTS.DRAW_ABOUT_IT]: {
        [CONSTANTS.SCORE]: false,
        [CONSTANTS.ZOOM]: true,
        Display: "Draw-about-It",
    }
};
