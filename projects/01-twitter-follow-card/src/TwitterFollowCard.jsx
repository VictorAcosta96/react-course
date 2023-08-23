import { useState } from "react"

export function TwitterFollowCard ({children ,userName , initialIsFollowing}) {

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing 
    ?   'tw-followCard-button is-following' :
        'tw-followCard-button'


    //  console.log("TwitterFollowCard render userName: ", userName);   
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img className="tw-followCard-avatar" src={`https://unavatar.io/${userName}`} alt="avatar del usuario" />
                <div className="tw-followCard-info">
                    <strong>{children}</strong>
                    <strong className='tw-followCard-infoUserName'>@{userName}</strong>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                <span className="tw-followCard-text">{text}</span>
                <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
       </article>
    )
}

// nota -> las props en react deberian ser inmutables es decir no las debemos cambiar ni modificar