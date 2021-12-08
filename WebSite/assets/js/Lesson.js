export default class Lesson {
  
  constructor(lesson) {
    this.lesson = lesson
  }

  getCourse() {
    return this.lesson.getElementsByTagName('courseName')[0].innerHTML
  }

  getDate() {
    return this.lesson.getElementsByTagName('day')[0].innerHTML + '.' + this.lesson.getElementsByTagName('month')[0].innerHTML + '.' + this.lesson.getElementsByTagName('year')[0].innerHTML
  }

  getDay() {
    const [day, month, year] = this.getDate().split('\.')
    const date = new Date(year, month - 1, day)

    return date.getDay()
  }

  getMonth() {
    return this.getDate().split('\.')[1] - 1
  }
  
  getYear() {
    return this.getDate().split('\.')[2]
  }

  getClassName() {
    return this.getCourse(this.lesson) + this.lesson.getElementsByTagName('semester')[0].innerHTML + this.lesson.getElementsByTagName('className')[0].innerHTML
  }

  getRoom() {
    return this.lesson.getElementsByTagName('block')[0].innerHTML + this.lesson.getElementsByTagName('floor')[0].innerHTML + '.' + this.lesson.getElementsByTagName('number')[0].innerHTML
  }

  getTime(startOrEnd) {
    const time = this.lesson.getElementsByTagName(startOrEnd)[0]
    
    return time.getElementsByTagName('hour')[0].innerHTML + ':' + ((time.getElementsByTagName('minutes')[0].innerHTML == 0) ? '00' : time.getElementsByTagName('minutes')[0].innerHTML)
  }

  getWeek() {
    const [day, month, year] = this.getDate().split('\.');
    const date = new Date(year, month - 1, day);
  
    //find the year of the current date  
     const oneJan =  new Date(date.getFullYear(), 0, 1);   
  
     // calculating number of days in given year before a given date   
     const numberOfDays =  Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));   
  
     // adding 1 since to current date and returns value starting from 0   
     return Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);    
  }

}