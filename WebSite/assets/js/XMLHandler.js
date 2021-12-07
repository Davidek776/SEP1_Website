export default class XMLHandler {
  
  constructor( xml, Lesson ) {
    this.table = $('.schedule')[0]
    this.Lesson = Lesson
    this.xml = xml
    this.lessons
    this.today = this.getToday()
  }  

  getToday() {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '')
    const mm = String(today.getMonth() + 1).padStart(2, '')
    const yyyy = today.getFullYear()

    return dd + '.' + mm + '.' + yyyy
  }

  getLessons() {
    this.lessons = this.xml.children[0].children

    return this.lessons
  }

  showData() {
    let str = ''

    //looping throught every lesson, adding them to table
    Array.from(this.lessons).forEach(element => {
      str = ''

      let lesson = new this.Lesson(element)

      const node = $(`[data-week=${lesson.getWeek()}]`)[0].children[lesson.getDay() - 1]

      //highlighting todays lessons
      if (lesson.getDate(lesson) == this.today)
        node.classList.add('today')
      //   str += `<div class="glide__slide cell today ${lesson.getCourse()}">`
      // else
      //   str += `<div class="glide__slide cell ${lesson.getCourse()}">`

      str += `<div class="lesson ${lesson.getCourse()}">`
      str += '<span class="date item">' + lesson.getDate() + '</span>'
      str += '<span class="item">' + lesson.getClassName()
      str += '-' + lesson.getRoom() + '</span>'
      str += '<span class="item">' + lesson.getTime('StartTime') + ' - ' + lesson.getTime('EndTime') + '</span>'
      str += '</div>'

      //adding string to node
      node.innerHTML += str
      console.log(this.today)
    })
    

    /**
     * We used external library for schedule
     * 
     * https://nickpiscitelli.github.io/Glider.js/
     */
    const glider = new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
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

    document.querySelector('.glider').addEventListener('glider-slide-visible', function () {
      $('#weekNo')[0].innerHTML = this.querySelector('.active').getAttribute('data-week')
    })
  }

}