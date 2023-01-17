import {Router} from 'express'; //this syntax is used to import only what we need. Earlier, we used to import the express object first and then extract the router from that but with typescript we can import only what we require.
import {Todo} from '../models/todo'; //this is how you import a named export.
const router = Router();
const todos: Todo[] = [];   //we're telling ts that all the items inside this array will be of type Todo.

router.get('/', (req, res, next)=>{
    res.status(200).json({todos: todos})
})

router.post('/todo', (req, res, next)=>{
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo);
    res.json(todos);
})

router.post('/delete', (req, res, next)=>{
    console.log(todos);
})

export default router; //typescript also makes it easier to export things. This will export the router.