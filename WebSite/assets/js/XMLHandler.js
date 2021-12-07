export default class XMLHandler {
  
  constructor( xml ) {
    this.table = $('.schedule')[0]
    this.xml = xml
    this.firstLesson
    this.lastLesson
  }  

  showData() {
    const lessons = this.xml.children[0].children
    let str = ''
  
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '')
    const mm = String(today.getMonth() + 1).padStart(2, '')
    const yyyy = today.getFullYear()

    today = dd + '.' + mm + '.' + yyyy

    this.firstLesson = lessons[0]
    this.lastLesson = lessons[lessons.length - 1]

    Array.from(lessons).forEach(lesson => {
      if (this.getDate(lesson) == today)
        str += `<div class="glide__slide cell today ${this.getCourse(lesson)}">`
      else
        str += `<div class="glide__slide cell ${this.getCourse(lesson)}">`

      // str += '<span class="week item"> week ' + this.getWeek(this.getDate(lesson)) + '</span>'
      str += '<span class="date item">' + this.getDate(lesson) + '</span>'
      str += '<span class="item">' + this.getClassName(lesson)
      str += '-' + this.getRoom(lesson) + '</span>'
      str += '<span class="startTime item">' + this.getTime(lesson, 'StartTime') + ' - </span>'
      str += '<span class="item">' + this.getTime(lesson, 'EndTime') + '</span>'
  
      str += '</div>'

      
    })
    this.xml = this.xml
    
    console.log(this.xml)
    
    this.table.innerHTML += str

    /**
     * We used external library for schedule
     * 
     * https://nickpiscitelli.github.io/Glider.js/
     */
    const glider = new Glider(document.querySelector('.glider'), {
      slidesToShow: 5,
      slidesToScroll: 5,
      // exactWidth: 200,
      // itemWidth: 200,
      draggable: true,
      dragVelocity: 1,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    })

    glider.scrollItem(10)
  }

  getCourse(lesson) {
    return lesson.getElementsByTagName('courseName')[0].innerHTML
  }

  getDate(lesson) {
    return lesson.getElementsByTagName('day')[0].innerHTML + '.' + lesson.getElementsByTagName('month')[0].innerHTML + '.' + lesson.getElementsByTagName('year')[0].innerHTML
  }

  getClassName(lesson) {
    return this.getCourse(lesson) + lesson.getElementsByTagName('semester')[0].innerHTML + lesson.getElementsByTagName('className')[0].innerHTML
  }

  getRoom(lesson) {
    return lesson.getElementsByTagName('block')[0].innerHTML + lesson.getElementsByTagName('floor')[0].innerHTML + '.' + lesson.getElementsByTagName('number')[0].innerHTML
  }

  getTime(lesson, startOrEnd) {
    const time = lesson.getElementsByTagName(startOrEnd)[0]
    return time.getElementsByTagName('hour')[0].innerHTML + ':' + time.getElementsByTagName('minutes')[0].innerHTML
  }

  getWeek(dateString) {
    //define a date object variable that will take the current system date  
    const todaydate = new Date();  

    const [day, month, year] = dateString.split('\.');
    const date = new Date(year, month - 1, day);
  
    //find the year of the current date  
     const oneJan =  new Date(date.getFullYear(), 0, 1);   
  
     // calculating number of days in given year before a given date   
     const numberOfDays =  Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));   
  
     // adding 1 since to current date and returns value starting from 0   
     return Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);    
  }

}