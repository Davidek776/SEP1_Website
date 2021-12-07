export default class XMLHandler {
  
	constructor( fileName ) {
		this.fileName = fileName
    this.xml = ''
    this.table = $('.schedule')[0]
  }

  addToTable() {
    this.readXML(this.fileName)
  }

  readXML(file) {
    
    const _this = this

    $.ajax({
      type: "GET",
      url: file,
      dataType: "xml",
      success: function(xml) {
        _this.xml = xml
        _this.showData()
      }
    })
  }

  showData() {
    const lessons = this.xml.children[0].children
    let str = ''
  
    Array.from(lessons).forEach(lesson => {
      str += `<div class="cell  ${this.getCourse(lesson)}">`


      str += '<span class="date item">' + this.getDate(lesson) + '</span>'
      str += '<span class="item">' + this.getClassName(lesson)
      str += '-' + this.getRoom(lesson) + '</span>'
      str += '<span class="startTime item">' + this.getTime(lesson, 'StartTime') + ' - </span>'
      str += '<span class="item">' + this.getTime(lesson, 'StartTime') + '</span>'
      // str += this.getTime(lesson, 'EndTime')
  
      str += '</div>'

    })
    
    this.table.innerHTML += str
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

}