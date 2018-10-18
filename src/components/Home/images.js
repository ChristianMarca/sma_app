import React from 'react';

import './style.css';

const Carrucel=props=>{
    return(
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">
                        <div className="item active">
                            <figure className="snip0016">
                                <img src="/images/BSs_1.PNG" alt="sample41" onClick={(event)=>event.preventDefault()}/>
                                <figcaption>
                                    <h2>Plataforma <span>SMA_APP</span> </h2>
                                    <p>Tiene como objetivo realizar el manejo de las interrupciones del servicio de telefonía móvil avanzada
                                    mediante la implementacion de varias herramientas para facilitar el proceso, mediante una interfaz amigable
                                    .</p>
                                    {/* <a href="#"></a> */}
                                </figcaption>			
                            </figure>
                        </div>

                        <div className="item">
                            <figure className="snip0016">
                                <img src="/images/BSs_2.PNG" alt="sample42" onClick={(event)=>event.preventDefault()}/>
                                <figcaption>
                                    <h2>Plataforma <span>SMA_APP</span></h2>
                                    <p>Se comunica con <span>BSs_APP</span> con el fin de 
                                        facilitar la visualización de estado de Radio Bases.</p>
                                    {/* <a href="#"></a> */}
                                </figcaption>			
                            </figure>
                        </div>

                        <div className="item">
                            <figure className="snip1321"><img src="/images/BSs_3.PNG" alt="sq-sample26" onClick={(event)=>event.preventDefault()}/>
                                <figcaption><i className="fas fa-box-open"></i>
                                    <h4>Desarrolladores    </h4>
                                    <h2><i className="fab fa-github" href="https://github.com/ChristianMarca">C.Marca</i>/<i className="fab fa-github">A.Crespo</i></h2>
                                </figcaption>
                                {/* <a href="#"></a> */}
                            </figure>
                        </div>
                    </div>

                    {/* <!-- Left and right controls --> */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
    )
};

export default Carrucel;