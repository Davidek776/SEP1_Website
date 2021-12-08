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

}