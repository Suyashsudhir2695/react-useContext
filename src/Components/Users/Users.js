    import React ,{useContext} from 'react'
    import { Link } from 'react-router-dom';

    import usersContext from '../../contexts/usersContext'
import './Users.css'


const Users = () => {

    const context = useContext(usersContext);
    if (context.users.length < 1){
        return(
            <div className="container">


            <h1>Here's the list of users</h1>
            <hr/>
            <div>
                There are {context.users.length} users
                <br></br><br></br>
                To get your name to show here
                <br>
                </br>
                <br/>
                <Link className="link-btn" to="/"> Sign Up </Link>
                <div>
               
                </div>
                

            </div>
           
            
         </div>

        
        )
    }
    

    return(
    <div className="container">

<Link  to="/"> Back to Sign up </Link>
       <h1>Here's the list of users</h1>
       <hr/>
       <div>
           There are {context.users.length} users
       </div>
        {context.users.map((u) =>(
            <div key={Math.random()* 10000000} className='users-list-box'>
                <div>
                    {u.name}
                </div>
                <div>
                    {u.email}
                </div>
                <div>
                    {u.number}
                </div>
                
               
            </div>
        ))}
       
    </div>

        
    );
};
export default Users;
