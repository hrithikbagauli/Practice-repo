import {Router} from 'express'; //this syntax is used to import only what we need. Earlier, we used to import the express object first and then extract the router from that but with typescript we can import only what we require.
import {Todo} from '../models/todo'; //this is how you import a named export.
const router = Router();
const todos: Todo[] = [];   //we're telling ts that all the items inside this array will be of type Todo.
type RequestBody = {text: string};
type RequestParams = {id: string};
router.get('/', (req, res, next)=>{
    res.status(200).json({todos: todos})
})

router.post('/todo', (req, res, next)=>{
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo);
    res.json(todos);
})

router.post('/delete/:id', (req, res, next) => {
    const params = req.params as RequestParams;
    for(let i=0; i<todos.length; i++){
        if(todos[i].id == params.id){
            todos.splice(i, 1);
            return res.json({success: 'successful', todos: todos});
        }
    }
    res.status(404).json('not found');
});

router.post('/edit/:id', (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;
    for(let i=0; i<todos.length; i++){
        if(todos[i].id == params.id){
            todos[i].text = body.text;
            return res.json({success: 'successful', todos: todos});
        }
    }
    res.status(404).json('not found');
});

export default router; //typescript also makes it easier to export things. This will export the router.