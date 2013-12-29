function Node (data,left,right) {
    this.data = data;
    this.left = left;
    this.right = right;
}
Node.prototype.replaceWith = function(node) {
    if (!node) node = new Node(); 
    Node.call(this, node.data, node.left, node.right); 
    Node.call(node); // resets everything to undefined
};

////////////////////////////////////////////////////////////////////

// TODO: pass in a compare function
function BST (arr) {
    this.size = this.height = 0;
    if (arr) arr.forEach(this.insert.bind(this));
}
BST.prototype = {
    contains: function (data) {return !!this.getNode(data)},
    getNode: function (data) {
        for (node = this.root; !!node;) {
            if (data === node.data) return node;
            node = (data > node.data)? node.right : node.left;
        }
    },
    insert: function (data) {
        var node = this.root;
        var height = 1;
        
        while (node) { height++;
            if (data === node.data) return;
            var dir = (data > node.data)? 'right' : 'left';
            if (node[dir] && node[dir].data) {node = node[dir]; continue}
            else {node[dir] = new Node(data); break}
        }
        
        if (!this.root) this.root = new Node(data);
        if (height > this.height) this.height = height;
        this.size++;
    },
    remove: function (data) {try{
        var node = this.getNode(data);
        var successor = node.right || node.left;
        
        if (node.right && node.left) { // two successors
            while (successor.left) successor = successor.left;
            node.data = successor.data;
            successor.replaceWith(successor.right);
        }
        else node.replaceWith(successor); // one or less successors
        
        // TODO: update height
        this.size--;
        
        // return true on success, false on failure
        return true} catch(err) {return false}
    },
    toString: function () {JSON.stringify(this.root)}
    // TODO: draw tree structure in console instead
}

///////////////////////////////////////////////////////////////////

var tree = new BST([1,5,2,9,5,8]);
console.log(tree);
console.log(tree.height); // -> 4
console.log(tree.size); // -> 5
console.log(tree.contains(5)); // -> true
console.log(tree.contains(12)); // -> false

tree.remove(5); // -> true
tree.remove(10); // -> false
console.log(tree);
console.log(tree.contains(5)); // -> false
console.log(tree.height); // -> 3
console.log(tree.size); // -> 4

tree.insert(8.5);
console.log(tree);
console.log(tree.height); // -> 4
console.log(tree.size); // -> 5