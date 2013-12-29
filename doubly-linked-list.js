function Node (data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
}
Node.prototype = {toString: function() {return this.data}}

function DoubleList () {[].forEach.call(arguments, this.append.bind(this));}

DoubleList.prototype = {
    append: function (data) { // should the list or node be returned ?
        if (!this.head) return this.tail = this.head = new Node(data);
        else return this.tail = this.tail.next = new Node(data, this.tail);
    },
    prepend: function (data) {
        if (!this.tail) return this.tail = this.head = new Node(data);
        else return this.head = this.head.prev = new Node(data, null, this.head);
    },
    pop_back: function (callback) {
        var temp = this.tail;
        (this.tail = this.tail.prev).next = null;
        if (callback) callback(temp);
    },
    pop_front: function (callback) {
        var temp = this.head;
        (this.head = this.head.next).prev = null;
        if (callback) callback(temp);
    },
    toString: function () {  
        var list = [this.head], current = this.head;
        while (current = current.next) list.push(current.toString());
        return list.join(', ');
    }
};

var list = new DoubleList('first', 'second', 'third');
console.log(list.toString());

list.pop_front(function(node) {console.log('front node "%s" removed', node.data)});
list.pop_back();
console.log(list.toString());

list.append('last');
console.log(list.toString());

        