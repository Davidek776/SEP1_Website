import XMLHandler from './XMLHandler.js'
import Table from './Table.js'
import Lesson from './Lesson.js'

$.ajax({
  type: "GET",
  url: "assets/lessons.xml",
  dataType: "xml",
  success: function(xml) {
    init(xml)
  }
})

function init(xml) {
  const handler = new XMLHandler(xml, Lesson)
  const table = new Table($('.schedule')[0], Lesson)

  table.lessons = handler.getLessons()
  
  table.generateTable()
}

