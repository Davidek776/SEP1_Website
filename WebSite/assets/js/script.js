import Table from './Table.js'
import Lesson from './Lesson.js'


getData('lessonsX.xml')

$('#classSelect').on('change', function (e) {
  const option = this.options[this.selectedIndex].value
  const fileName = 'lessons' + option + '.xml'
  
  $('.schedule')[0].innerHTML = ''

  getData(fileName)
})



function getData(fileName) {
  $.ajax({
    type: "GET",
    url: "assets/" + fileName,
    dataType: "xml",
    success: function(xml) {
      init(xml)
    }
  })
}

function init(xml) {
  const table = new Table(xml, Lesson)

  if (table.glider != null ) table.destroyGlider()

  table.generateTable()
}

