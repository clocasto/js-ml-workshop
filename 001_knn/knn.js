var chalk = require('chalk')
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

KNN.prototype._majority = function(k, arrayOfClassifications){
	let arr = arrayOfClassifications.slice(0, k);
	let total = [0,0]
	while (arr.length !== 0){
		//get first index of array (to be compared)
		let ele = arr[0];
		//take out all indexes that have a value equal to arr[0]
		let arrNew = arr.filter(a => a !== ele)
		//the difference in lengths will give us the total number of indexes removed
		let count = arr.length - arrNew.length;
		//if total # is greater than previous highest, this count is new highest
		if (count > total[1]){
			total = [ele, count]
		}
		//set remaining array equal to arr, and filter again.
		arr = arrNew
	}
	return total[0];
}


KNN.prototype.predictSingle = function(singleVector){
	let unsortedArray = this._distances(singleVector, this.points)
	let sortedArray = this._sorted(unsortedArray);
	return this._majority(this.kSize, sortedArray)
}

KNN.prototype.predict = function(arrayOfVectors){
	return arrayOfVectors.map(function(element){
		return this.predictSingle(element)
	}.bind(this))
}

KNN.prototype.score = function(dataToTest){
	let masterClassifications = dataToTest.map(function(index){
		return index[1];
	})
	let vectorsToPredict = dataToTest.map(function(index){
		return index[0];
	})
	let output = this.predict(vectorsToPredict);

	let totalSame = 0;

	for (let i = 0; i < output.length; i++){
		if (output[i] === masterClassifications[i]){
			totalSame++
		}
	}
	return totalSame / output.length
}


function sortingFunc(first, second){
	return first[0] - second[0];
}

module.exports = KNN
