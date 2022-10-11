// async function main(){
//     const res = function(){
//         return new Promise((resolve)=>{
//             setTimeout(() => {
//                 resolve('successful');
//             }, 2000);
//         })
//     }
    
//     console.log(await res());
// }

// main();


async function main(){
    const req = await axios.get('https://crudcrud.com/api/0fc08194aab54683b4ccc63226052457/expenses');
    console.log((req).data);
}

main();
