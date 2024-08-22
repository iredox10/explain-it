import axios from "axios"
import useFetch from "../../hooks/useFetch"
import { path } from "../../utils/path"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

const AdminDrafts = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    const {data ,loading, err} = useFetch(`${path}/get-user-drafts/${user._id}`)
    console.log(data)

    return(
        <div>{user.username} drafts
        <div>
            {data && data.drafts.map(draft =>(
                <div key={draft._id}>
                    <NavLink to={`/drafted-post/${draft._id}`}>{draft.title}</NavLink>
                </div>
            ))}
            </div> 
         </div>
    )
}

export default AdminDrafts