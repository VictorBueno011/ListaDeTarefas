import { Timer } from "./timer.js"
import { Notifyer } from "./Notifyer.js"
const App = {
async start(){
 try{
    const time= 25* 60;
    Timer.init(time)
    await Notifyer.init()
    Notifyer.notify({
        title:"tarefas",
        body:"Existem tarefas para fazer"
    })
 }catch (err){
    console.log(err.message)
 }
}
}
export{App}