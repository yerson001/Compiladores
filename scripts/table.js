console.log("this-->");
function Node(data) {
    this.data = data;
    this.children = [];
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);
        const parent = toNodeData ? this.findBFS(toNodeData) : null;
        if(parent) {
            parent.children.push(node)
        } else {
            if(!this.root)
                this.root = node;
            else
                return "nodo existe"
        }
    }

    findBFS(data) {
        const queue = [this.root];
        let _node = null;
        this.traverseBFS((node) => {
            if(node.data === data) {
                _node = node;
            }
        })

        return _node;
    }

    traverseBFS(cb) {
        const queue = [this.root];

        if(cb)
            while(queue.length) {
                const node = queue.shift();
                cb(node)
                    for(const child of node.children) {
                    queue.push(child);
                }
            }
    }
  _preOrder(node, fn) {
    if(node) {
      if(fn) {
        fn(node);
      }
      for(let i = 0; i < node.children.length; i++) {
        this._preOrder(node.children[i], fn);
      }
    }
  }
  traverseDFS(fn, method) {
    const current = this.root;
    if(method) {
      this[`_${method}`](current, fn);
    } else {
      this._preOrder(current, fn);
    }
  }

   print() {
    if(!this.root) {
      return console.log('No root node found');
    }
    const newline = new Node('|');
    const queue = [this.root, newline];
    let string = '';
    while(queue.length) {
      const node = queue.shift();
      string += `${node.data.toString()} `;
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    console.log(string.slice(0, -2).trim());
  }

  printByLevel() {
    if(!this.root) {
      return console.log('No root node found');
    }
    const newline = new Node('\n');
    const queue = [this.root, newline];
    let string = '';
    while(queue.length) {
      const node = queue.shift();
      string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
    console.log(string.trim());
  }
}

const tree = new Tree();
tree.add('0');
tree.add('1', '0');
tree.add('2', '0');
tree.add('3', '1');
tree.add('4', '1');
tree.add('5', '2');
tree.add('6', '2');
tree.print();
console.log("-----------------------");
tree.printByLevel();
console.log("-----------BFS---------");
tree.traverseBFS(node => { console.log(node.data); });
console.log("-----------DFS----------");
tree.traverseDFS(node => { console.log(node.data); }); 
