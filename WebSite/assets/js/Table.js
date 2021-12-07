export default class Table {
  constructor( table, firstLesson ) {
		this.table = table
    this.date = new Date()
    this.today = this.date.getDate()
    this.firstLesson = firstLesson
  }

  generateTable() {
    // this.table.innerHTML += '<div class="week"></div>'
  }

  highlightToday() {
    Array.from($('.cell')).forEach(cell => {
      // console.log(cell)
    });
  }

}