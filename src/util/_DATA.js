let users = {
  thailq6: {
    id: 'thailq6',
    password:'pwthailq6',
    name: 'Le Quang Thai',
    avatarURL: 'https://img.freepik.com/free-vector/hand-drawn-asian-children-illustration_23-2150924063.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  vanmth1: {
    id: 'vanmth1',
    password:'123456',
    name: 'Mai Thi Hong Van',
    avatarURL: 'https://img.freepik.com/premium-photo/vector-cartoon-baby-character-cute-baby-learning-walk_826378-2802.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  vanttt31: {
    id: 'vanttt31',
    password:'xyz123',
    name: 'Tran Thi Thuy Van',
    avatarURL: 'https://img.freepik.com/premium-vector/cheerful-chubby-girl-winter-beanie-hat-hand-drawn-cartoon-sticker-icon-concept-illustration_730620-77813.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  longltv: {
    id: 'longltv',
    password:'longltv123',
    name: 'Le Tran Viet Long',
    avatarURL: 'https://img.freepik.com/premium-vector/hand-drawn-cartoon-sticker-icon-concept-isolated-illustration-template_1016520-3420.jpg?w=826',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'thailq6',
    timestamp: 1467166872634,
    optionOne: {
      votes: [],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'vanmth1',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'hire more frontend developers',
    },
    optionTwo: {
      votes: ['vanttt31'],
      text: 'hire more backend developers'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'longltv',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['vanttt31'],
      text: 'conduct release retrospectives quarterly'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'longltv',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['vanmth1'],
      text: 'have code reviews conducted by managers'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'thailq6',
    timestamp: 1489579767190,
    optionOne: {
      votes: [],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['vanmth1'],
      text: 'take a course on unit testing with Jest'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'vanttt31',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['vanmth1'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['vanttt31'],
      text: 'deploy to production once every month'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  console.log('_saveQuestion',question)
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    console.log('formattedQuestion', formattedQuestion)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedEmployee, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedEmployee || !qid || !answer) {
      reject("Please provide authedEmployee, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedEmployee]: {
          ...users[authedEmployee],
          answers: {
            ...users[authedEmployee].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedEmployee])
          }
        }
      }

      resolve(true)
    }, 500)
  })
}
