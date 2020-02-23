const data = [...document.querySelectorAll('form.questionflagsaveform .que')]

const questions = data.map(e => {
    const value = (e.querySelector('.info input.questionflagpostdata') || {}).value || ''
    const code = value.split("&")[2].split("=")[1]
    const content = (e.querySelector('.content .formulation .qtext') || {}).innerText
    const answer = (e.querySelector('.content .outcome .rightanswer') || {}).innerText
    return {content, answer, code}    
})
