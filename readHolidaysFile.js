const fs = require('fs')

const resourcesPath = process.resourcesPath
const path = resourcesPath + '/app/holidays.txt'

function convertASCII(file) {
    let holidays = []

    holiday = {
        day: undefined,
        month: undefined,
        year: undefined,
        repeating: false
    }

    let buff = ''

    for (let i = 0; i < file.length + 1; i++) {
        if (file.charCodeAt(i) !== 10) {
            if (file.charCodeAt(i) === 13 || i === file.length) {

                holidays.push(holiday)
                holiday = {
                    day: undefined,
                    month: undefined,
                    year: undefined,
                    repeating: false
                }
            } else {
                if (file.charCodeAt(i) === 32) {
                    if (!holiday.day) holiday.day = Number(buff)
                    else if (!holiday.month) holiday.month = Number(buff)
                    else if (!holiday.year) { 
                        holiday.year = Number(buff) }
                    buff = ''
                } else {
                    if (file.charCodeAt(i) === 112) { holiday.repeating = true }
                    else {
                        buff = buff.concat(file[i])
                    }
                }
            }
        }
    }
    return holidays
}

function formateDates(dates) {
    for (let date of dates) {
        date.month += -1
    }
    return dates
}

module.exports = function () {
    let file =
        fs.readFileSync(path, { encoding: 'utf8' })

    return formateDates(convertASCII(file))
}
