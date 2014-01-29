var Stack = function() {
  this.storage = {};
  this.len = 0;
};

Stack.prototype.size = function(){
  return this.len;
};
Stack.prototype.push = function(value){
  this.len++;
  this.storage[this.len] = value;
};
Stack.prototype.pop = function(){
  if (this.len){
    var result = this.storage[this.len];
    this.len--;
  }
  return result;
};

var Queue = function() {
  this.len = 0;
  this.storage = {};
  this.firstIndex = 0;
  this.count = 0;
};

Queue.prototype.size = function() {
  return this.len;
}
Queue.prototype.enqueue = function(value) {
  this.storage[this.count] = value;
  this.len++;
  this.count++;
}
Queue.prototype.dequeue = function() {
  if(this.len) {
    var result = this.storage[this.firstIndex];
    delete this.storage[this.firstIndex];
    this.len--;
    this.firstIndex++;
  }
  return result;
}