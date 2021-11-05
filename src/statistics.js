function createStats() {
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
				return "Statistics have been stopped"
			}
			return counter
		}
	}
}

window.stats = createStats()