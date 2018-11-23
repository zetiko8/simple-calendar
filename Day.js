const holidays = require('./readHolidaysFile')()

/*
*   Vrne true, če je dani dan praznik
*/
function isOneOfHolidays(day, month, year) {
    for (let holiday of holidays) {
        if (
            holiday.day === day
            &&
            holiday.month === month
        ) {
            if (holiday.repeating) return true
            else {
                if (holiday.year === year) {
                    return true
                }
            }
        }
    }
    return false
}

module.exports = function Day(
    i, referenceDate, weekDay
) {
    // Nastavljanje dayNumber, month, year

    // Če je dan iz meseca pred danim referenceDate
    if (i < referenceDate.getFirstDayOfMonthWeekDay()) {


        this.dayNumber =
            referenceDate.getPreviousMonthDaysOfMonth() - (referenceDate.getFirstDayOfMonthWeekDay() - i) + 1
        this.month = referenceDate.month - 1
        this.isInCurrentMonth = false
        if (this.month === 11) this.year = referenceDate.year - 1
        else this.year = referenceDate.year
    }

    // Če je dan iz istega meseca kot dani referenceDate
    else if (i >= referenceDate.getFirstDayOfMonthWeekDay() && (i - referenceDate.getFirstDayOfMonthWeekDay()) < referenceDate.getDaysOfMonth()) {

        this.dayNumber =
            i - referenceDate.getFirstDayOfMonthWeekDay() + 1
        this.month = referenceDate.month
        this.isInCurrentMonth = true
        this.year = referenceDate.year

    }

    // Če je dan v mesecu za danim referenceDate
    else {

        this.dayNumber =
            i - referenceDate.getDaysOfMonth() - referenceDate.getFirstDayOfMonthWeekDay() + 1
        this.month = referenceDate.month + 1
        this.isInCurrentMonth = false
        if (this.month === 11) this.year = referenceDate.year + 1
        else this.year = referenceDate.year

    }

    // nastavi this.isHoliday = true, če je dan sob/ned, ali eden od praznikov
    if (weekDay === 5 || weekDay === 6) this.isHoliday = true
    else if (isOneOfHolidays(this.dayNumber, this.month, this.year)) {
        this.isHoliday = true
    } else this.isHoliday = false

}
