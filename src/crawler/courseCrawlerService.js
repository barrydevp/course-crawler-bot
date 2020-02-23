const axios = require('axios')

exports.resolveQuiz = ({code}, quiz) => axios.put(
		`${process.env.COURSE_CRAWLER_HOST}/quizs?code=${code}`, quiz
    )

exports.bulkUpdateQuestion = ({questions, quiz_id, url}) => axios.post(
		`${process.env.COURSE_CRAWLER_HOST}/questions/bulk-update`, {
	        questions,
	        quiz_id,
	        url,
	    }
    )