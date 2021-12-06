export default class XMLHandler {
  
	constructor( fileName ) {
		this.fileName = fileName
    this.xml = ''
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

  getDate(lesson) {
    return lesson.getElementsByTagName('day')[0].innerHTML + '.' + lesson.getElementsByTagName('month')[0].innerHTML + '.' + lesson.getElementsByTagName('year')[0].innerHTML
  }

  getClassName(lesson) {
    return lesson.getElementsByTagName('courseName')[0].innerHTML + lesson.getElementsByTagName('className')[0].innerHTML
  }

  getRoom(lesson) {
    return lesson.getElementsByTagName('block')[0].innerHTML + '.' + lesson.getElementsByTagName('floor')[0].innerHTML + '.' + lesson.getElementsByTagName('number')[0].innerHTML
  }

  getTime(lesson, startOrEnd) {
    const time = lesson.getElementsByTagName(startOrEnd)[0]
    return time.getElementsByTagName('hour')[0].innerHTML + ' : ' + time.getElementsByTagName('minutes')[0].innerHTML
  }

  showData() {
    const lessons = this.xml.children[0].children
    let str = ''
  
    Array.from(lessons).forEach(lesson => {
      str += '<tr>'

      str += this.getDate(lesson)
      str += this.getClassName(lesson)
      str += this.getRoom(lesson)
      str += this.getTime(lesson, 'StartTime')
      // str += this.getTime(lesson, 'EndTime')
  
      str += '<tr>'
    })
  
    const table = $('.scheduleTable')[0]
    
    table.children[1].innerHTML += str
  }

}