import * as $ from "jquery"

function createAnalytics() {
	let counter: number = 0
	let isStopped: boolean = false

	const listener = (): number => ++counter

	$(document).on("click", listener)

	return {
		stop() {
			$(document).off("click", listener)
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

window["stats"] = createAnalytics()