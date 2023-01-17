"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //this syntax is used to import only what we need. Earlier, we used to import the express object first and then extract the router from that but with typescript we can import only what we require.
const router = (0, express_1.Router)();
const todos = []; //we're telling ts that all the items inside this array will be of type Todo.
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.json(todos);
});
router.post('/delete/:id', (req, res, next) => {
    const params = req.params;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == params.id) {
            todos.splice(i, 1);
            return res.json({ success: 'successful', todos: todos });
        }
    }
    res.status(404).json('not found');
});
router.post('/edit/:id', (req, res, next) => {
    const body = req.body;
    const params = req.params;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == params.id) {
            todos[i].text = body.text;
            return res.json({ success: 'successful', todos: todos });
        }
    }
    res.status(404).json('not found');
});
exports.default = router; //typescript also makes it easier to export things. This will export the router.
