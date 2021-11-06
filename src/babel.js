const resolve = async () => {
	return await Promise.resolve("Hello")
}

const unused = 32

resolve().then(console.log("Promise have been resolved"))

class Util {
	static id = Date.now()
}

import('lodash').then(({ default: _ }) => {
  console.log('Lodash', _.random(0, 42, true))
})

console.log("Static id: ", Util.id)