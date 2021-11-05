class Status {
	constructor(status) {
		this.status = status
		this.date = new Date()
	}

	toString() {
		return JSON.stringify({
			status: this.status,
			date: this.date.toJSON()
		})
	}
}