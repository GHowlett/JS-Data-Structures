function Node (data, prev) {
    this.data = data;
    this.prev = prev;
}
Node.prototype = {toString: function() {return this.data}}

function Stack() {[].forEach.call(arguments, this.push.bind(this))}

Stack.prototype = {
    push: function(data) {this.top = new Node(data, this.top)},
    pop: function(callback) {
        if (!this.top) {callback('Underflow'); return}
        var temp = this.top.data;
        this.top = this.top.prev;
        callback(null, temp);
    },
    toString: function() {
        var arr = [this.top], current = this.top;
        while (current = current.prev) arr.push(current);
        return arr.join(', ');
    }
}

var stack = new Stack('bottom', 'middle', 'top');
console.log(stack.toString());

stack.pop(function(err,data) {console.log(data + ' removed')});
console.log(stack.toString());

stack.push('new top');
console.log(stack.toString());
    