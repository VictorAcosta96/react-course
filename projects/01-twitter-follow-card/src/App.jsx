// import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    // const format = (userName) => `@${userName}`
    // const [name, setName] = useState('midudev')
    // console.log("Render with name:", name );

    const users = [
        {
            userName: "midudev",
            name: "Miguel Angel Duran",
            isFollowing: true
        },
        {
            userName: "kikobeats",
            name: "Kiko Beats",
            isFollowing: false
        },
        {
            userName: "dorianDesings",
            name: "Dorian Desings",
            isFollowing: true
        },
        {
            userName: "desarrolloUtil",
            name: "Desarrollo Util",
            isFollowing: false
        }
    ]

    return (
        <div className='App'>
            {/**esto es un comentarion en jsx */}

            {/* renderizado condicional */}
            {
                users.map(user => {
                    const {userName, name, isFollowing} = user
                    return (
                    <TwitterFollowCard 
                    key={userName}
                    userName={userName} 
                    initialIsFollowing={isFollowing}
                    >
                    {name}
                    </TwitterFollowCard>
                   )
                })
            }


            {/* <TwitterFollowCard  userName="midudev" initialIsFollowing>
              Miguel Angel Duran
            </TwitterFollowCard>
            <TwitterFollowCard  userName="kikobeats" >
                kiko beats
            </TwitterFollowCard>    
            <TwitterFollowCard  userName="dorianDesings" initialIsFollowing>
                Dorian Desings
            </TwitterFollowCard>
            <TwitterFollowCard  userName="desarrolloUtil">
                Desarrollo Util
            </TwitterFollowCard> */}
            {/* <button onClick={()=> setName('goku')}>
                Cambiar Nombre
            </button> */}
        </div>
    )
}


// isFollowing -> esto es lo mismo que esto -> isFollowing={true} 
//pasar booleano como prop 

// pasar funciones como props
/**
 * // definimos la funcion
 * const formatUsername = (userName) => `@${userName}`
 * 
 * // la pasamos como prop en el componente
 *  <TwitterFollowCard formatUsername={formatUsername} isFollowing userName="midudev" name="Miguel Angel Duran"/>
 */
