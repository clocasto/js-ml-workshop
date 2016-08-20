
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}



KNN.prototype.train = function(trainingData){
	this.points = this.points.concat(trainingData)
}


module.exports = KNN
