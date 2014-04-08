
// -----------------------STACK------------------------- //

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


// -----------------------QUEUE------------------------- //

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


// -----------------------TREE------------------------- //

var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  newTree.children = undefined;
  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  newTree.removeFromParent = treeMethods.removeFromParent;
  newTree.traverse = treeMethods.traverse;

  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  this.children = this.children || [];
  var child = makeTree(value);
  child.parent = this;
  this.children.push(child);
};

treeMethods.contains = function(target){
  var result = false;

  var search = function(target, tree){
    if (target === tree.value){
      result = true;
    } else if (tree.children){
      for(var i=0; i<tree.children.length; i++){
        search(target, tree.children[i]);
      }
    }
  };

  search(target, this);
  return result;
};

treeMethods.removeFromParent = function () {
  if(this.parent) {
    var index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }
  this.parent = null;

};

treeMethods.traverse = function(callback){
  callback(this.value);
  if(this.children) {
    for (var i= 0; i <this.children.length; i++) {
      this.children[i].traverse(callback);
    }
  }
};
