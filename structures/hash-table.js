var HashTable = function (size, hash) {
    if(hash) this.hash = hash;
    this.table = new Array(size);
}

HashTable.prototype = {
    insert: function(key,val) {
        var hash = this.hash(key);
        if (!this.table[hash]) this.table[hash] = {};
        this.table[hash][key] = val;
    },
    has: function(key) {
        return !!this.table[this.hash(key)][key]
    },
    percentFull: function() { // TODO: use this.has for cohesion
        var filled = this.table.filter( function(a){return !!a} );
        return (filled.length / this.table.length) *100;
    },
    hash: function(key) {return key % this.table.length}
}

var hashTable = new HashTable(10);
hashTable.insert(2, 'two');
hashTable.insert(12, 'twelve');
hashTable.insert(13, 'thirteen');
console.log(hashTable.table);

console.log(hashTable.has(13)); // -> true
console.log(hashTable.has(23)); // -> false

console.log(hashTable.percentFull() + '%'); // -> 20%
