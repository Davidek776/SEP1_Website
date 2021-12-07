export default class Table {

  constructor( table, Lesson ) {
		this.table = table
    this.Lesson = Lesson
    this.lessons
  }

  generateTable() {
    let firstLesson = new this.Lesson(this.lessons[0])
    let lastLesson = new this.Lesson(this.lessons[this.lessons.length - 1])

    //looping throught weeks, creating days in html
    for(let i = firstLesson.getWeek(); i <= lastLesson.getWeek(); i++) {
      this.table.innerHTML += 
      `<div class="week" data-week="${i}">
        <div class="day"></div>
        <div class="day"></div>
        <div class="day"></div>
        <div class="day"></div>
        <div class="day"></div>
      </div>`
    }
    // this.table.innerHTML += '<div class="week"></div>'
  }

}