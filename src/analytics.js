function createAnalytics() {
	let counter = 0
	let isStopped = false

	const listener = () => ++counter

	document.addEventListener("click", listener)

	return {
		stop() {
			document.removeEventListener("click", listener)
			isStopped = true
		},

		getStats() {
			if (isStopped) {
				return `Statistics have been stopped with total ${counter} clicks`
			}
			return counter
		}
	}
}

window.stats = createAnalytics()