import React from 'react';

import './style.css';

export const ImageInfo=props=>{
    return(
        <div>
            <figure class="snip0016">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample43.jpg" alt="sample43"/>
                <figcaption>
                    <h2>I think the <span>surest</span> sign </h2>
                    <p>That intelligent life exists elsewhere in the universe is that none of it has tried to contact us.</p>
                    <a href="#"></a>
                </figcaption>			
            </figure>

            <figure class="snip1321"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample28.jpg" alt="sq-sample28"/>
                <figcaption><i class="ion-share"></i>
                    <h4>Quiche    </h4>
                    <h2>Hollandaise</h2>
                </figcaption><a href="#"></a>
            </figure>

        </div>
    )
}