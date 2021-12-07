import XMLHandler from './XMLHandler.js'
import Table from './Table.js'

$.ajax({
  type: "GET",
  url: "assets/lessons.xml",
  dataType: "xml",
  success: function(xml) {
    init(xml)
  }
})

function init(xml) {
  const handler = new XMLHandler(xml)
  handler.showData()
  
  const table = new Table($('.schedule')[0])
  
  
  table.generateTable()
  table.highlightToday()
}

