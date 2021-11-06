const resolve = async () => {
	return await Promise.resolve("Hello")
}

resolve().then(console.log("Promise have been resolved"))

class Util {
	static id = Date.now()
}

console.log("Static id: ", Util.id)