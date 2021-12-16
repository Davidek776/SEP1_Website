export default class Table {

  constructor( xml, Lesson ) {
    this.xml = xml
    this.Lesson = Lesson
    this.lessons = this.xml.children[0].children
    this.glider
  }

  /**
   * Generate nodes and add them to html
   */
  generateTable() {
    const firstLesson = new this.Lesson(this.lessons[0])
    const lastLesson = new this.Lesson(this.lessons[this.lessons.length - 1])
    let firstDay

    //creating node dynamically everytime
    const node = 
    `<div class="glider-contain">
      <div class="glider schedule"></div>
      <button aria-label="Previous" class="glider-prev">«</button>
      <button aria-label="Next" class="glider-next">»</button>
    </div>`

    $('#classSelect').after($($.parseHTML(node))[0])



    //looping throught weeks, creating days in html
    for(let week = firstLesson.getWeek(); week <= lastLesson.getWeek(); week++) {

      firstDay = this.getDateOfWeek(week, firstLesson.getYear())

      $('.schedule')[0].innerHTML += 
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
    let str = '', node

    //looping throught every lesson, adding them to table
    Array.from(this.lessons).forEach(element => {
      str = ''

      let lesson = new this.Lesson(element)

      node = $(`[data-date="${lesson.getDate()}"]`)[0]
    
      str += `<div class="lesson ${lesson.getCourse()}">`
      // str += '<span class="date item">' + lesson.getDate() + '</span>'
      str += '<span class="item">' + lesson.getClassName()
      str += '-' + lesson.getRoom() + '</span>'
      str += '<span class="item">' + lesson.getTime('StartTime') + ' - ' + lesson.getTime('EndTime') + '</span>'
      str += '</div>'

      //adding string to node
      node.innerHTML += str
    })
    
    this.createGlider()
    this.scrollToWeek()
    
    this.highlightToday()
    
  }

  destroyGlider() {
    $('.glider-contain').remove()
  }
  
  /**
   * Create new Glider object, add event listener so number of week is changed everytime we change week
   */
  createGlider() {
    /**
     * We used external library for schedule
     * 
     * https://nickpiscitelli.github.io/Glider.js/
     */
    this.glider = new Glider(document.querySelector('.schedule'),{
      slidesToScroll: 1,
      slidesToShow: 1,
      draggable: true,
      scrollLock: true,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    })
    
    //changing week number
    document.querySelector('.glider').addEventListener('glider-slide-visible', function () {
      $('#weekNo')[0].innerHTML = $('.active').data('week')
    })
  }

  /**
   * Scroll to current week
   */
  scrollToWeek() {
    //scroll to current week
    const firstLesson = new this.Lesson(this.lessons[0])
    
    if ($(`[data-date="${this.getToday()}"]`).length)
      this.glider.scrollItem( ($(`[data-date="${this.getToday()}"]`).parent().data('week') - firstLesson.getWeek()) * 5)
  }
  
  /**
   * Adding number of dates to date
   * @param {*} date 
   * @param {*} days 
   * @returns String
   */
  addDays(date, days) {
    date.setDate(date.getDate() + days)
    
    const dd = String(date.getDate()).padStart(2, '')
    const mm = String(date.getMonth() + 1).padStart(2, '')
    const yyyy = date.getFullYear()

    return dd + '.' + mm + '.' + yyyy
  }
  
  /**
   * Get current date as String
   * @returns String
   */
  getToday() {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '')
    const mm = String(today.getMonth() + 1).padStart(2, '')
    const yyyy = today.getFullYear()
    
    return dd + '.' + mm + '.' + yyyy
  }
  
  /**
   * Calculate first day date of week from week number and year
   * @param {*} w 
   * @param {*} y 
   * @returns Date
   */
  getDateOfWeek(w, y) {
    let date = new Date(y, 0, (1 + w * 7))
    date.setDate(date.getDate() + (1 - date.getDay()))
    return date
  }
  
  /**
   * Highlighting element which represents current day
   */
  highlightToday() {
    if ($(`[data-date="${this.getToday()}"]`).length)
      $(`[data-date="${this.getToday()}"]`)[0].classList.add('today')
  }
  
}