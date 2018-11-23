const _und = require('underscore')

const startYear = 1934
const months31 = [0, 2, 4, 6, 7, 9, 11]
const months30 = [3, 5, 8, 10]

/*
*   vrne število dni za dani mesec
*/
function getDaysOfMonth(month, year) {
    if (_und.contains(months31, month)) return 31
    else if (_und.contains(months30, month)) return 30
    else if (isLeapYear(year)) return 29
    else return 28
}

/*
*   returns true če je leto prestopno
*/
function isLeapYear(year) {
    if (
        (year % 4 === 0)
        &&
        !(
            year % 100 === 0
            &&
            !(year % 400 === 0)
        )
    ) {
        return true
    } else {
        return false
    }
}

/*
*   Vrne številko, ki predstavlja koliko dni je preteklo med startDate in danim dnevom
*/
function getDayIndex(day, month, year) {
    let dayIndex = 0

    // dodaj število dni za pretekla leta
    for (let i = 0; i < year - startYear; i++) {
        if (isLeapYear(startYear + i)) {
            dayIndex += 366
        } else {
            dayIndex += 365
        }
    }

    // dodaj število dni za pretekle mesece
    for (let i = 0; i < month; i++) {
        dayIndex += getDaysOfMonth(i, year)
    }

    // dodaj število dni
    dayIndex += day

    return dayIndex
}

/*
*   Vrne dan v tednu: pon - 0, tor - 1 ...
*/
function getWeekDay(dayIndex) {
    let weekDayIndex = (dayIndex - 1) % 7
    if (weekDayIndex === undefined) return 0
    else return weekDayIndex
}

/*
*   Validira dani datum
*/
function validate(day, month, year) {
    var validationErrors = []
    try {
        validateYear(year)
    } catch (error) {
        validationErrors.push(error)
    }
    try {
        validateMonth(month)
    } catch (error) {
        validationErrors.push(error)
    }
    try {
        validateDay(day, month, year)
    } catch (error) {
        validationErrors.push(error)
    }
    if (validationErrors.length > 0) throw validationErrors
}

function validateYear(year) {
    try {
        if (year >= startYear) {
            return true
        } else throw Error()
    } catch (error) {
        throw 'Vnos za leto ni veljaven'
    }
}

function validateMonth(month) {
    try {
        if (month <= 11 && month >= 0) return true
        else throw Error()
    } catch (error) {
        throw 'Vnos za mesec ni veljaven'
    }
}

function validateDay(day, month, year) {
    try {
        if(day < 1) throw Error()
        if (day <= getDaysOfMonth(month, year)) return true
        else throw Error()
    } catch (error) {
        throw 'Vnos za dan ni veljaven'
    }
}

class MyDate {
    constructor(day /* day : number / dateString : string */, month /* 0-11 */, year /* number > startYear */, weekDay /* 0-6 */) {

        // Če je arg sestavljen iz dateString
        if (arguments.length === 1) {
            let values = day.split('.');
            this.day = Number(values[0]);
            this.month = Number(values[1]) - 1;
            this.year = Number(values[2]);
        }
        // Če je arg (day, month, year)
        else {
            this.day = day
            this.month = month
            this.year = year
        }

        // Validira datum
        try {
            validate(this.day, this.month, this.year)
        } catch (error) {
            throw error
        }

    }

    getDaysOfMonth() {
        return getDaysOfMonth(this.month, this.year)
    }

    isLeapYear() {
        return isLeapYear(this.year)
    }

    getPreviousMonthDaysOfMonth() {
        return getDaysOfMonth(this.month - 1, this.year)
    }

    getNextMonthDaysOfMonth() {
        return getDaysOfMonth(this.month + 1, this.year)
    }

    getFirstDayOfMonthWeekDay() {
        return getWeekDay(getDayIndex(1, this.month, this.year))
    }

    toString() {
        return this.day + '.' + (this.month + 1) + '.' + this.year
    }

    static inString(day, month, year) {
        return day + '.' + (month + 1) + '.' + year
    }

}

module.exports = MyDate