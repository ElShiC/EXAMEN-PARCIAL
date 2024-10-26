import { Router } from "express";
import path from 'node:path'
import jwt from "jsonwebtoken"
import { fileURLToPath } from 'url';

export const router = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const SECRET_KEY = 'EXAMENPARCIAL'

const verificarToken = (req, res, next) => {
    const authorization = req.headers['authorization']
    const token = authorization.split(' ')[1]
  
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(404).json({status: 401, message: "Fallo al ingresar"})
        }
        req.user = user
        next()
      })
    } else {
      return res.status(404).json({status: 401, message: "Fallo al ingresar"})
    }
  };


router.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error al enviar el archivo:', err);
            res.status(err.status).end();
        } else {
            return
        }
    });
})

router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'login.html');
      res.sendFile(filePath, (err) => {
          if (err) {
              console.error('Error al enviar el archivo:', err);
              res.status(err.status).end();
          } else {
              return
          }
      });
  })


  
const admin = {
    user: 'elshi',
    password: 'elshipro.123'
};

router.post('/acces', (req, res) => {
    try {    
      const { user, password } = req.body || {};
        console.log(user,password)
      if (!user || !password) {
        return res.status(400).json({ status: 400, message: 'Usuario o contraseña no proporcionados' });
      }
      
      if (user.trim() === admin.user && password === admin.password) {
        console.log('Bienvenido', user);
        
        const token = jwt.sign({ user: admin.user }, SECRET_KEY, { expiresIn: '1h' });
        
        return res.status(202).json({ message: token });
      } else {
        return res.status(401).json({ status: 401, message: 'Fallo al iniciar sesión' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: 'Error del servidor' });
    }
});


router.get('/bienvenido', verificarToken, (req, res) => {
  const filePath = path.join(__dirname, 'public', 'dashboard.html');
  res.sendFile(filePath, (err) => {
    if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(err.status).end();
    } else {
        return
    }
});
})
  