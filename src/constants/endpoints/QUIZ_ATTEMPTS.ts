const QUIZ_ATTEMPTS = {
  getAll: '/Attempts/getAll',
  getDetails: '/Attempts/getDetails',
  start: '/Attempts/start',
  getQuestion: '/Attempts/getQuestion',
  getAnswers: '/Attempts/getAnswers',
  checkAnswer: '/Attempts/checkAnswer',
  getSummary: '/Attempts/getSummary',
  complete: '/Attempts/complete',
  getReview: '/Attempts/getReview',
  getSkeleton: '/Attempts/getSkeleton',
  addNew: '/Attempts/addNew'
} as const

export default QUIZ_ATTEMPTS
