import "./backgroundbubbles.css"

function BackgroundBubble(){
    return (
        <section className='backgroundBubbleColor'>
            <div className="bubbles">
            <div className="bubble_m left-top background_cyan_500"></div>
            <div className="bubble_m right-top background_cyan_700">
                <div className="bubble_s left-bottom background_cyan_600"></div>
            </div>
            <div className="bubble_l left-bottom background_cyan_900">
                <div className="bubble_m right-top background_cyan_700"></div>
            </div>
            <div className="bubble_s right background_cyan_900"></div>
            <div className="bubble_s center background_cyan_700">
                <div className="bubble_xs center-left background_cyan_900"></div>
            </div>
            <div className="bubble_s right-bottom background_cyan_700"></div>
            </div>
        </section>
    )
}

export default BackgroundBubble