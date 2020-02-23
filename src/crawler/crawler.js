const puppeteer = require('puppeteer')
const {bulkUpdateQuestion} = require('./courseCrawlerService')
const {isUndef} = require('../helpers/is')

const _delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || 30)
const DEFAULT_BUFF_SEC = parseInt(process.env.DEFAULT_BUFF_SEC || 180)

const checkRequired = (...args) => {
    args.forEach(a => {
        if(isUndef(a)) throw new Error('Args in crawler.js is required.')
    })
}

module.exports = async ({code, session, quiz_id}) => {
    checkRequired(code, session, quiz_id)

    const browser = await puppeteer.launch({headless: false})

    try {
        const page = await browser.newPage()

        await page.setCookie({
            name: 'MoodleSession',
            value: session,
            url: 'https://onlinecourses.uet.vnu.edu.vn'
        })

        await page.goto(`https://onlinecourses.uet.vnu.edu.vn/mod/quiz/view.php?id=${code}`)

        // await page.$$eval('form.login100-form input.input100', (inputs) => {
        //     const inputName = inputs[0]
        //     const inputPassword = inputs[1]

        //     inputName.value = ''
        //     inputPassword.value = ''
        //     // console.log(inputName)
        //     // console.log(inputPassword)
        // })

        // await Promise.all([
        //     page.waitForNavigation(),
        //     page.$eval('form.login100-form button.login100-form-btn', (submitBtn) => {
        //         submitBtn.click()
        //     })
        // ])

        await Promise.all([page.waitForNavigation(),
            page.$eval('.quizstartbuttondiv form button.btn.btn-secondary', (submitBtn) => {
                submitBtn.click()
            })
        ])

        try {
            /**
             * Handing for continue the quiz if the last time has started the quiz
             *
            **/
            await Promise.all([page.waitForNavigation(),
                page.$eval('form.mform input#id_submitbutton', (submitBtn) => {
                    submitBtn.click()
                })
            ]) 
        } catch(error) {
            console.log('error submit after click start')
        }
        

        const autoAnswer = async (retries) => {
            if(retries > MAX_RETRIES) return

            const buff = retries < 2 ? 2 - retries : 0
            const ms = 1000 * (buff * DEFAULT_BUFF_SEC + 40 * (1 - 2 * retries + retries * retries) / MAX_RETRIES / MAX_RETRIES)

            await _delay(ms)

            try {

                await chooseAnswerAndNext()

                // await page.$$eval('form#responseform .formulation .answer', (questions) => {
                //     const ans = questions.map(e => e.querySelector('input[type=radio]'))
                //     ans.forEach(e => e.click())
                // })

                // await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}),
                //     page.$eval('form#responseform .submitbtns input.mod_quiz-next-nav', (submitBtn) => {
                //         submitBtn.click()
                //     })
                // ])

                // await page.$$eval('form#responseform .formulation .answer', (questions) => {
                //     const ans = questions.map(e => e.querySelector('input[type=radio]'))
                //     ans.forEach(e => e.click())
                // })

                // await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}),
                //     page.$eval('form#responseform .submitbtns input.mod_quiz-next-nav', (submitBtn) => {
                //         submitBtn.click()
                //     })
                // ])

                // await page.$$eval('form#responseform .formulation .answer', (questions) => {
                //     const ans = questions.map(e => e.querySelector('input[type=radio]'))
                //     ans.forEach(e => e.click())
                // })

                await submitQuiz()
                
            } catch(e) {
                console.log(e)
                await autoAnswer(retries++)
            }
        }

        const chooseAnswerAndNext = async () => {
            try {
                await page.$$eval('form#responseform .formulation .answer', (questions) => {
                    const ans = questions.map(e => e.querySelector('input[type=radio]'))
                    ans.forEach(e => e.click())
                })

                await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}),
                    page.$eval('form#responseform .submitbtns input.mod_quiz-next-nav', (submitBtn) => {
                        submitBtn.click()
                    })
                ])
                
            } catch(e) {
                console.log('choose answer error.')
            }
        }

        const submitQuiz = async () => {
            await page.$$eval('.submitbtns form button.btn.btn-secondary', (submitBtns) => {
                submitBtns[1].click && submitBtns[1].click()
            })

            await page.waitForSelector('.confirmation-buttons input.btn.btn-primary')

            await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}),
                page.$eval('.confirmation-buttons input.btn.btn-primary', (submitBtn) => {
                    submitBtn.click()
                })
            ])
        }

        await autoAnswer(0)

        // await page.reload({waitUntil: 'networkidle0'})

        const questions = await page.$$eval('form.questionflagsaveform .que', (data) => {
            const questions = data.map(e => {
                const value = (e.querySelector('.info input.questionflagpostdata') || {}).value || ''
                const code = value.split("&")[2].split("=")[1]
                const content = (e.querySelector('.content .formulation .qtext') || {}).innerText
                const answer = (e.querySelector('.content .outcome .rightanswer') || {}).innerText
                return {content, answer, code}    
            })

            return questions
        })

        // // console.log(questions)

        const url = await page.url()

        const response = await bulkUpdateQuestion({url, questions, quiz_id})

        console.log(response.data)

        
    } catch(e) {
        console.log(e)
    }

    await browser.close()

}