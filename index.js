import express, { response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'

//MIs importtaciónes creadas
import router from './routes'

//Conexión a la base de datos
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useCreateIndex: true ,useNewUrlParser: true, useUnifiedTopology: true})
.then(mongoose => console.log('Conectando a la DB en el puesto 27017'))
.catch(err => console.log(err))

const app = express(); 

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)

app.set('port', process.env.PORT || 3000 )

//Variable para obtener el puerto del servidor
let port = app.get('port')

app.listen(port, () => {
    console.log('El servidor se esta ejecutando en el puerto ' + port );
});

