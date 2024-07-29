const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

let envios = [
    {
        id: 2967704,
        fecha: '15/07/2024',
        origen: 'Huechuraba',
        destino: 'Los Angeles',
        ubicacion: 'Centro Los Angeles',
        cliente: 'COMERCIAL HIMALAYA LIMITADA',
        consignatario: 'Magdalena Galaz',
        tipo: 'CC',
        valor: 20500,
        estado: 'Mercadería Ingresada en Origen (Huechuraba)',
        observaciones: 'No Aplica',
        peso: 0,
        tipoEnvio: 'PickUp'
    },
    {
        id: 2967930,
        fecha: '15/07/2024',
        origen: 'Huechuraba',
        destino: 'Temuco',
        ubicacion: 'Oficina Temuco',
        cliente: 'SOLUC. TECNOL. PROCAD LTDA.',
        consignatario: 'MILLA DEPORTES LTDA.',
        tipo: 'PP',
        valor: 6500,
        estado: 'Mercadería Ingresada en Origen (Huechuraba)',
        observaciones: 'No Aplica',
        peso: 0,
        tipoEnvio: 'PickUp'
    },
    {
        id: 2967945,
        fecha: '16/07/2024',
        origen: 'Santiago',
        destino: 'Valparaíso',
        ubicacion: 'Sucursal Valparaíso',
        cliente: 'EMPRESA LOGÍSTICA S.A.',
        consignatario: 'Juan Pérez',
        tipo: 'NC',
        valor: 12000,
        estado: 'Mercadería En Tránsito',
        observaciones: 'Entrega en Proceso',
        peso: 5,
        tipoEnvio: 'Express'
    },
    {
        id: 2967956,
        fecha: '17/07/2024',
        origen: 'Santiago',
        destino: 'Concepción',
        ubicacion: 'Oficina Concepción',
        cliente: 'LOGÍSTICA GLOBAL LTDA.',
        consignatario: 'Ana Martínez',
        tipo: 'PP',
        valor: 8000,
        estado: 'Mercadería Entregada',
        observaciones: 'Entrega Completada',
        peso: 3,
        tipoEnvio: 'Standard'
    },
    {
        id: 2967967,
        fecha: '18/07/2024',
        origen: 'Valparaíso',
        destino: 'Temuco',
        ubicacion: 'Sucursal Temuco',
        cliente: 'SERVICIOS EXPRESS LTDA.',
        consignatario: 'Carlos Gómez',
        tipo: 'CC',
        valor: 9500,
        estado: 'Mercadería En Almacén',
        observaciones: 'Esperando Confirmación',
        peso: 2,
        tipoEnvio: 'Express'
    }
];

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('', (request, response) => {
    return response.status(200).json({
        message: "API DE PRUEBA"
    }).end()
})

app.get('/data', (request, response) => {
    return response.status(200).json(envios).end();
});

app.post('/data/:id', (request, response) => {
    const { id } = request.params;
    console.log('ID: ', id);
    const { body } = request;
    console.log('BODY: ', body);
    let findEnvio = envios.find(envio => envio.id == id);
    console.log('FIND: ', findEnvio);

    if(!findEnvio) {
        return response.status(404).json({
            error: {
                message: "Envio no encontrado"
            }
        }).end();
    } 

    envios = envios.map( envio => {
        if(envio.id == id) {
            return body;
        }
        return envio;
    });

    console.log('ENVIO: ', envios);

    return response.status(200).json(body).end();

});

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
})