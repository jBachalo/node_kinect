var edge = require('edge'),
	path = require('path')
	events = require('events'),
	_ = require('lodash'),
	util = require('util');

function Kinect2(options) {
	events.EventEmitter.call(this);

	var dllProperties = {
		assemblyFile: __dirname + path.sep + 'NodeKinect2.dll',
	    typeName: 'NodeKinect2.Startup'
	};

	this.edge = {};
	this.edge.create = edge.func(_.assign({}, dllProperties));
	this.edge.open = edge.func(_.assign({ methodName: 'Open' }, dllProperties));
	this.edge.openDepthReader = edge.func(_.assign({ methodName: 'OpenDepthReader' }, dllProperties));
	this.edge.openBodyIndexReader = edge.func(_.assign({ methodName: 'OpenBodyIndexReader' }, dllProperties));
	this.edge.openColorReader = edge.func(_.assign({ methodName: 'OpenColorReader' }, dllProperties));
	this.edge.openInfraredReader = edge.func(_.assign({ methodName: 'OpenInfraredReader' }, dllProperties));
	this.edge.openLongExposureInfraredReader = edge.func(_.assign({ methodName: 'OpenLongExposureInfraredReader' }, dllProperties));
	this.edge.openBodyReader = edge.func(_.assign({ methodName: 'OpenBodyReader' }, dllProperties));
	this.edge.close = edge.func(_.assign({ methodName: 'Close' }, dllProperties));

	this.edge.create({
		logCallback: this.logCallback.bind(this)
	}, true);
}

util.inherits(Kinect2, events.EventEmitter);

Kinect2.prototype.open = function() {
	return this.edge.open(null, true);
};

Kinect2.prototype.openDepthReader = function() {
	return this.edge.openDepthReader({
		depthFrameCallback: this.depthFrameCallback.bind(this)
	}, true);
};

Kinect2.prototype.openBodyIndexReader = function () {
    return this.edge.openBodyIndexReader({
        bodyIndexFrameCallback: this.bodyIndexFrameCallback.bind(this)
    }, true);
};

Kinect2.prototype.openColorReader = function() {
	return this.edge.openColorReader({
		colorFrameCallback: this.colorFrameCallback.bind(this)
	}, true);
};

Kinect2.prototype.openInfraredReader = function() {
	return this.edge.openInfraredReader({
		infraredFrameCallback: this.infraredFrameCallback.bind(this)
	}, true);
};

Kinect2.prototype.openLongExposureInfraredReader = function() {
	return this.edge.openLongExposureInfraredReader({
		longExposureInfraredFrameCallback: this.longExposureInfraredFrameCallback.bind(this)
	}, true);
};

Kinect2.prototype.openBodyReader = function() {
	return this.edge.openBodyReader({
		bodyFrameCallback: this.bodyFrameCallback.bind(this)
	}, true);
};

Kinect2.prototype.close = function() {
	return this.edge.close(null, true);
};

Kinect2.prototype.logCallback = function(msg) {
	console.log('[Kinect2]', msg);
};

Kinect2.prototype.bodyFrameCallback = function(input, callback) {
	this.emit('bodyFrame', input);
};

Kinect2.prototype.depthFrameCallback = function(data) {
	this.emit('depthFrame', data);
};

Kinect2.prototype.bodyIndexFrameCallback = function (data) {
    this.emit('bodyIndexFrame', data);
};

Kinect2.prototype.colorFrameCallback = function(data) {
	this.emit('colorFrame', data);
};

Kinect2.prototype.infraredFrameCallback = function(data) {
	this.emit('infraredFrame', data);
};

Kinect2.prototype.longExposureInfraredFrameCallback = function(data) {
	this.emit('longExposureInfraredFrame', data);
};

module.exports = Kinect2;