
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}



KNN.prototype.train = function(trainingData){
	this.points = this.points.concat(trainingData)
}

KNN.prototype._distance = function(vectorOne, vectorTwo){
	let sum1 = 0;
	for (let i = 0; i < vectorOne.length; i++){
		sum1 += Math.pow(vectorTwo[i] - vectorOne[i], 2)
	}
	return Math.sqrt(sum1)
}


KNN.prototype._distances = function(vector, trainingData){
	let output = [];
	for (let i = 0; i < trainingData.length; i++){
		output.push([this._distance(vector, trainingData[i][0]), trainingData[i][1]])
	}
	return output
}

KNN.prototype._sorted = function(arrayOfDistances){
	let sorted = []
	sorted = arrayOfDistances.sort(sortingFunc)
	sorted = sorted.map(function(element){
		return element[1];
	})
	return sorted
}

function sortingFunc(first, second){
	return first[0] - second[0];
}

module.exports = KNN
