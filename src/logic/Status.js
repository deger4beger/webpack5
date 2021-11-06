export default class Status {
	constructor(status, img) {
		this.status = status
		this.img = img
		this.date = new Date()
	}

	toString() {
		return JSON.stringify({
			status: this.status,
			img: this.img,
			date: this.date.toJSON()
		}, null, 2)
	}
}