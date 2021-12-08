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
  const table = new Table(xml, Lesson)
  
  table.generateTable()
}

