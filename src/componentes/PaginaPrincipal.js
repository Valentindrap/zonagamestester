import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import NavbarPage from "./NavbarPage";
import "../componentes/PaginaPrincipal.css";

const juegos = [
    {
        id: 1,
        nombre: "GTA 6",
        url: "https://www.onlinegames.io/games/2023/unity2/gta-simulator/index.html",
        calificacion: 4.5,
        descripcion: `El GTA 6 está aquí, papu.`,
        portada: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2024/03/gta-6-3282307.jpg?tf=3840x"
    },
    { id: 2, nombre: "Get On Top", url: "https://www.onlinegames.io/games/2024/code/6/get-on-top/index.html", calificacion: 4.0, descripcion: "a ver quien es mas locon", portada: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/3078616e30ecc5f326bd8e6cad728a03.png" },
    { id: 3, nombre: "Head Soccer 2022", url: "https://www.onlinegames.io/games/2023/construct/280/head-soccer-2022/index.html", calificacion: 5.0, descripcion: "el 1 con la WASD Y LA N Y M. El otro con la flechita y el 1 y 2. a juga", portada: "https://static.playhop.com/images/cc987_2977039_227e0/84f3ca624/2a00000180d6ac39_3fe781f/1329a0cbcf3a908ddae0_4d36e2/orig" },
    { id: 4, nombre: "Draw Here", url: "https://www.onlinegames.io/games/2021/unity2/draw-here/index.html", calificacion: 5.0, descripcion: "NOSE PERO TENES QUE DIBUJAR", portada: "https://www.onlinegames.io/media/posts/567/responsive/Draw-Here-lg.jpg" },
    { id: 5, nombre: "G-SWITCH 3", url: "https://html5-games.io/game/g-switch-3/", calificacion: 5.0, descripcion: "El puto goty", portada: "https://play-lh.googleusercontent.com/ylSOEyk2tG390Pm4-IRUlMVtjNuYnxgX1aTm6ZxC_I6hCHjanvHFgZkCCw73sGE3lg" },
    { id: 6, nombre: "Fuego y Agua", url: "https://pavel-skala.github.io/Fireboy-and-Watergirl/", calificacion: 5.0, descripcion: "Dos jovenes papuchos en escapa de la bestia", portada: "https://play-lh.googleusercontent.com/6N_ON50BZiEAe-ll2lM92NrVrgp5I5Ha6VI0a4Usw7uPmgEjL6tgJR6jWYUkkYgx2LM" },
    {
        id: 7,
        nombre: "Clicker Heroes",
        url: "https://clickerheroes.com/",
        calificacion: 4.7,
        descripcion: "Haz clic para derrotar a monstruos y desbloquear héroes en tu camino hacia la victoria.",
        portada: "https://play-lh.googleusercontent.com/XqysWlDWj5nBr0zZMtB08Bt4pe3MsE8XXOAgqZYiD1s65phAUWUcLIBLxdiAkfjfIsM"
    },
    {
        id: 8,
        nombre: "Mr. Mine",
        url: "https://mrmine.com/game/",
        calificacion: 4.5,
        descripcion: "Excava y descubre tesoros ocultos mientras gestionas tus recursos en esta divertida aventura minera.",
        portada: "https://f4.bcbits.com/img/a0036462721_10.jpg"
    },
    {
        id: 9,
        nombre: "Kong Poker Quest",
        url: "https://playsaurus.com/kongPokerQuest63/",
        calificacion: 4.6,
        descripcion: "Pon a prueba tus habilidades de póker en este emocionante juego lleno de estrategia y acción.",
        portada: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUS2BfMAGf_2hMfD1hl4D4gZfVL8kNtfQ0Uw&s"
    },
    {
        id: 10,
        nombre: "Grindcraft",
        url: "https://grindcraft.com/game.php",
        calificacion: 4.8,
        descripcion: "Recoge recursos, crea herramientas y construye estructuras en este adictivo juego de crafting.",
        portada: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGO_dQvYqOOnJ35mO4pXthfrOGgIo1ad-p0p7Zg-i_XhrsUmukI52LbOatTbrW4TP0kU&usqp=CAU"
    },
    {
        id: 11,
        nombre: "Fray Fight",
        url: "https://frayfight.com/game/",
        calificacion: 4.4,
        descripcion: "Lucha con personajes únicos en este emocionante juego de peleas multijugador, donde solo los mejores sobrevivirán.",
        portada: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpLK1V9DYinRPqt4P36ZpfhUWsPlqIHiBHA&s"
    },
    {
        id: 12,
        nombre: "Zuno",
        url: "https://zv1y2i8p.play.gamezop.com/g/ByQxJnp7qRB",
        calificacion: 4.3,
        descripcion: "Adéntrate en un mundo lleno de desafíos y diversión en esta emocionante aventura.",
        portada: "https://static.gamezop.com/ByQxJnp7qRB/cover.jpg"
    },
    {
        id: 13,
        nombre: "Merge Mania",
        url: "https://zv1y2i8p.play.gamezop.com/g/hfPOimYqY",
        calificacion: 4.3,
        descripcion: "Combina elementos para avanzar en una serie de emocionantes retos y sorpresas.",
        portada: "https://static.gamezop.com/hfPOimYqY/cover.jpg"
    },
    {
        id: 14,
        nombre: "Blazin Blades",
        url: "https://zv1y2i8p.play.gamezop.com/g/UYiznUAya",
        calificacion: 4.3,
        descripcion: "Embárcate en una aventura épica llena de acción y batallas emocionantes.",
        portada: "https://static.gamezop.com/UYiznUAya/cover.jpg"
    },
    {
        id: 15,
        nombre: "Candy Fiesta",
        url: "https://zv1y2i8p.play.gamezop.com/g/r1zG1h6m90H",
        calificacion: 4.3,
        descripcion: "Únete a una colorida fiesta de dulces llena de aventuras y desafíos.",
        portada: "https://static.gamezop.com/r1zG1h6m90H/cover.jpg"
    },
    {
        id: 16,
        nombre: "Fruit Chop",
        url: "https://zv1y2i8p.play.gamezop.com/g/rkWfy2pXq0r",
        calificacion: 4.3,
        descripcion: "Corta frutas en un juego de velocidad y precisión que pondrá a prueba tus reflejos.",
        portada: "https://static.gamezop.com/rkWfy2pXq0r/cover.jpg"
    },
    {
        id: 17,
        nombre: "Zombies Can't Jump 2",
        url: "https://zv1y2i8p.play.gamezop.com/g/rkxMV8TI6Wg",
        calificacion: 4.3,
        descripcion: "Supera obstáculos y resuelve acertijos en un mundo donde los zombis no pueden saltar.",
        portada: "https://static.gamezop.com/rkxMV8TI6Wg/cover.jpg"
    },
    {
        id: 18,
        nombre: "Bouncy",
        url: "https://zv1y2i8p.play.gamezop.com/g/H1Tz6z1Dqym",
        calificacion: 4.3,
        descripcion: "Salta y rebota en un divertido juego lleno de desafíos dinámicos.",
        portada: "https://static.gamezop.com/rkxMV8TI6Wg/cover.jpg"
    },
    {
        id: 19,
        nombre: "Solitaire Gold",
        url: "https://zv1y2i8p.play.gamezop.com/g/rkPlk2T7qAr",
        calificacion: 4.3,
        descripcion: "Disfruta de una experiencia clásica de solitario con un toque de oro y recompensas.",
        portada: "https://static.gamezop.com/rkPlk2T7qAr/cover.jpg"
    },
    {
        id: 20,
        nombre: "Dunk Draw",
        url: "https://zv1y2i8p.play.gamezop.com/g/r1xZyhTQ50r",
        calificacion: 4.3,
        descripcion: "Combina habilidades de dibujo y baloncesto en este divertido desafío.",
        portada: "https://static.gamezop.com/r1xZyhTQ50r/cover.jpg"
    },
    {
        id: 21,
        nombre: "Pool Master",
        url: "https://zv1y2i8p.play.gamezop.com/g/hgempP8Sc",
        calificacion: 4.3,
        descripcion: "Conviértete en un maestro del billar y supera a tus oponentes en emocionantes partidas.",
        portada: "https://static.gamezop.com/hgempP8Sc/cover.jpg"
    },
    {
        id: 22,
        nombre: "Ludo with Friends",
        url: "https://zv1y2i8p.play.gamezop.com/g/SkhljT2fdgb",
        calificacion: 4.3,
        descripcion: "Disfruta del clásico juego de Ludo con amigos en una experiencia interactiva.",
        portada: "https://static.gamezop.com/SkhljT2fdgb/cover.jpg"
    },
    {
        id: 23,
        nombre: "Slide and Divide",
        url: "https://zv1y2i8p.play.gamezop.com/g/PLQTtp9Ei",
        calificacion: 4.3,
        descripcion: "Disfruta de una experiencia de puzzle única que desafiará tu mente.",
        portada: "https://static.gamezop.com/PLQTtp9Ei/cover.jpg"
    },
];


function PaginaPrincipal() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [filteredJuegos, setFilteredJuegos] = useState(juegos); // Juegos filtrados

    // Función para manejar la búsqueda y filtrar juegos
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchTerm(query);

        // Filtrar los juegos que coincidan con el nombre (ignorando mayúsculas/minúsculas)
        const filtered = juegos.filter((juego) => 
            juego.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredJuegos(filtered);
    };

    const handleJuegoClick = (juego) => {
        navigate(`/juego/${juego.id}`, { state: { juego } });
    };

    return (
        <div className="pagina-principal">
            <NavbarPage />
            <div className="contenedor-anuncios">
                <div className="anuncio"></div>
                <div className="catalogo-juegos">
                    <h1 className="juegos-titulo">Catálogo de Juegos</h1>
                    <div className="search-container">
                        <input 
                            type="text" 
                            name="search" 
                            placeholder="Buscar juegos..." 
                            className="search-input"
                            value={searchTerm} // Vincular el valor al estado de búsqueda
                            onChange={handleSearch} // Filtrar los juegos cuando cambie el texto
                        />
                        <a href="#" className="search-btn">
                        <i className="bi bi-search"></i>      
                        </a>
                    </div>
                    <ul>
                        {filteredJuegos.length > 0 ? (
                            filteredJuegos.map((juego) => (
                                <li key={juego.id} onClick={() => handleJuegoClick(juego)} className="catalogo-juegos-item">
                                    <img src={juego.portada} alt={`Portada de ${juego.nombre}`} />
                                    <h2>{juego.nombre}</h2>
                                    <p>Calificación: {juego.calificacion}</p>
                                </li>
                            ))
                        ) : (
                            <li>No se encontraron juegos.</li>
                        )}
                    </ul>
                </div>
                <div className="anuncio"></div>
            </div>
        </div>
    );
}

export default PaginaPrincipal;
