import { useEffect,useState } from "react";
import { getAllExamples } from "../../services/example.api";

export function ExamplesList() {
    const [examples, setExamples] = useState([])
    useEffect(()=>{

        async function loadExamples(){
            const res = await getAllExamples();
            setExamples(res.data);
        }
        loadExamples();
    },[]) 

    return <div>
        {examples.map(example =>(
            example
        ))}
    </div>


}