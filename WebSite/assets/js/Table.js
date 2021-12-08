export default class Table {

  constructor( table, Lesson ) {
		this.table = table
    this.Lesson = Lesson
    this.lessons
  }

  generateTable() {
    let firstLesson = new this.Lesson(this.lessons[0])
    let lastLesson = new this.Lesson(this.lessons[this.lessons.length - 1])
    let i = 0
    let firstDay


    //looping throught weeks, creating days in html
    for(let week = firstLesson.getWeek(); week <= lastLesson.getWeek(); week++) {

      firstDay = this.getDateOfWeek(week, firstLesson.getYear())

      this.table.innerHTML += 
      `<div class="week" data-week="${week}">
        <div class="day" data-date="${this.addDays(firstDay, 0)}"></div>
        <div class="day" data-date="${this.addDays(firstDay, 1)}"></div>
        <div class="day" data-date="${this.addDays(firstDay, 1)}"></div>
        <div class="day" data-date="${this.addDays(firstDay, 1)}"></div>
        <div class="day" data-date="${this.addDays(firstDay, 1)}"></div>
      </div>`

    }

    this.showData()
  }

  showData() {
    let str = ''

    //looping throught every lesson, adding them to table
    Array.from(this.lessons).forEach(element => {
      str = ''

      let lesson = new this.Lesson(element)

      const node = $(`[data-date="${lesson.getDate()}"]`)[0]
    
      str += `<div class="lesson ${lesson.getCourse()}">`
      // str += '<span class="date item">' + lesson.getDate() + '</span>'
      str += '<span class="item">' + lesson.getClassName()
      str += '-' + lesson.getRoom() + '</span>'
      str += '<span class="item">' + lesson.getTime('StartTime') + ' - ' + lesson.getTime('EndTime') + '</span>'
      str += '</div>'

      //adding string to node
      node.innerHTML += str
    })
    
    this.highlightToday()

    /**
     * We used external library for schedule
     * 
     * https://nickpiscitelli.github.io/Glider.js/
     */
    const glider = new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dragVelocity: 1,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    })

    glider.scrollItem(10)

    document.querySelector('.glider').addEventListener('glider-slide-visible', function () {
      $('#weekNo')[0].innerHTML = this.querySelector('.active').getAttribute('data-week')
    })
  }

  addDays(date, days) {
    date.setDate(date.getDate() + days)

    const dd = String(date.getDate()).padStart(2, '')
    const mm = String(date.getMonth() + 1).padStart(2, '')
    const yyyy = date.getFullYear()

    return dd + '.' + mm + '.' + yyyy
  }

  getToday() {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '')
    const mm = String(today.getMonth() + 1).padStart(2, '')
    const yyyy = today.getFullYear()

    return dd + '.' + mm + '.' + yyyy
  }

  getDateOfWeek(w, y) {
    let date = new Date(y, 0, (1 + w * 7))
    date.setDate(date.getDate() + (1 - date.getDay()))
    return date
  }

  highlightToday() {
    console.log($(`[data-date="${this.getToday()}"]`)[0].classList.add('today'))
  }

}