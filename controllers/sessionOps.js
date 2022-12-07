const root = (req, res) =>{
    if (req.session.contador) {
        req.session.contador++;
        res.status(200).send(`${req.session.nombre} hay ${req.session.contador} visitas tuyas`)
    } else {
        const nombre = req.query.nombre || 'b';
        req.session.contador= 1;
        req.session.nombre = nombre
        res.status(200).send(`${nombre} bienvenid@ `)
    }
}
const forget = (req, rs) =>{
    try {
        req.session.destroy();
        res.status(200). send ('Nos vemo luego')
    } catch (error) {
        res.send(500,'', error )
    }
}