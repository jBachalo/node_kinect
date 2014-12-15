# Node-Kinect2
Fork of original code here  https://github.com/wouterverweirder/node-kinect2
Work in progress

Attempting to add bodyIndexFrame functionality

![Screenshot](https://raw.githubusercontent.com/wouterverweirder/node-kinect2/master/node-kinect2-skeleton.png)

```
var Kinect2 = require('kinect2');

var kinect = new Kinect2();

if(kinect.open()) {
	console.log("Kinect Opened");
	//listen for body frames
	kinect.on('bodyFrame', function(bodies){
		for(var i = 0;  i < bodies.length; i++) {
			console.log(bodies[i]);
		}
	});

	//request body frames
	kinect.openBodyReader();

	//close the kinect after 5 seconds
	setTimeout(function(){
		kinect.close();
		console.log("Kinect Closed");
	}, 5000);
}
```
