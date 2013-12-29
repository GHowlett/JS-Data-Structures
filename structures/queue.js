function Node (data) {this.data = data}
Node.prototype = {toString: function() {return this.data;}}

function Queue () {
    this.count = 0;
    [].forEach.call(arguments, this.enqueue.bind(this));
}

Queue.prototype = {
    size: function () {return this.count},
    enqueue: function (data) {
        if (!this.tail) this.head = this.tail = new Node(data);
        else this.head = this.head.next = new Node(data);
        this.count++;
    },
    dequeue: function (callback) {
        if (!this.count) return callback? callback('Empty') : null;
        if (callback) callback(null, this.tail.data);
        this.tail = this.tail.next;
        this.count--;
    },
    toString: function () {  
        var arr = [this.tail], current = this.tail;
        while (current = current.next) arr.push(current);
        return arr.join(', ');
    }
};

/////////////  tests  //////////////////

var queue = new Queue('bottom', 'middle', 'top');
    console.log(queue.toString());

queue.dequeue(function (err,data) {console.log(err,data)});
console.log(queue.toString());
console.log(queue.size());

queue.enqueue('new head');
console.log(queue.toString());

queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue(function (err,data) {console.log(err,data)});

queue.enqueue('sole');
console.log(queue.toString());


        