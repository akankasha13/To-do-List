export default class Tasks {
    constructor(id, project, title, details, date, favFlag = false, icon = 'new-star', flagImg = "images/new-star.png", completed = false) {
        this.project = project;
        this.title = title;
        this.details = details;
        this.date = date;
        this.favFlag = favFlag;
        this.icon = icon;
        this.flagImg = flagImg
        this.completed = completed
        this.id = id
    }

    calculateDate() {
        if (this.date != 'No Due Date') {
            let newDate = new Date(this.date)
            newDate = newDate.toISOString().split('T')[0]
            return newDate
        }
        return -1
    }
}
