import { CLEARERROR, HANDLEERROR } from "../ActionTypes/errorTypes"

export const handleError =(msg)=>async(dispatch)=>{

    const id  = Math.random()

    dispatch(
        {
            type : HANDLEERROR,
            payload : {msg , id}
        }
    )

    setTimeout(() => {

        dispatch(
            {
                type : CLEARERROR ,
                payload : id
            }
        )
        
    }, 3000);

}