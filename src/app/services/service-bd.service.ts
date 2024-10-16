import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ServiceBDService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usu INTEGER PRIMARY KEY AUTOINCREMENT, rut_usu VARCHAR(15) NOT NULL, nombre_usu VARCHAR(50) NOT NULL, apellido_usu VARCHAR(50) NOT NULL, nombre_usuario VARCHAR(50) NOT NULL, clave_usu VARCHAR(20) NOT NULL, correo_usu VARCHAR(50) NOT NULL, token BOOLEAN NOT NULL, foto_usu BLOB , estado_usu BOOLEAN NOT NULL, rol_id INTEGER NOT NULL, FOREIGN KEY (rol_id) REFERENCES rol(id_rol));";
  
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(50) NOT NULL);";
  
  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT, f_venta INTEGER NOT NULL, total_venta INTEGER NOT NULL, usuario_id INTEGER NOT NULL, estado_id INTEGER NOT NULL, FOREIGN KEY (usuario_id) REFERENCES usuario(id_usu), FOREIGN KEY (estado_id) REFERENCES estado(id_estado));";
  
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nombre_est VARCHAR(20) NOT NULL);";
  
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (id_producto INTEGER PRIMARY KEY AUTOINCREMENT, nombre_prod VARCHAR(50) NOT NULL, precio_prod INTEGER NOT NULL, stock_prod INTEGER NOT NULL, descripcion_prod VARCHAR(100) NOT NULL, foto_prod BLOB, estatus_prod BOOLEAN DEFAULT 1, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(id_categoria));";
  
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, cantidad_det INTEGER NOT NULL, subtotal_det INTEGER NOT NULL, venta_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, FOREIGN KEY (venta_id) REFERENCES venta(id_venta), FOREIGN KEY (producto_id) REFERENCES producto(id_producto));";
  
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cat VARCHAR(50) NOT NULL);";

  tablaCarrito: string = "CREATE TABLE IF NOT EXISTS carrito (id_articulo_carrito INTEGER PRIMARY KEY AUTOINCREMENT, id_usu INTEGER, id_producto INTEGER, cantidad INTEGER DEFAULT 1, FOREIGN KEY (id_usu) REFERENCES usuario(id_usu) FOREIGN KEY (id_producto) REFERENCES producto(id_producto))"

  //INSERT
  rolUsuario1: string = "INSERT OR IGNORE INTO rol (nombre_rol) VALUES ('administrador');";
  rolUsuario2: string = "INSERT OR IGNORE INTO rol (nombre_rol) VALUES ('cliente');";
  registroUsuario: string = "INSERT OR IGNORE INTO usuario (rut_usu, nombre_usu, apellido_usu, nombre_usuario, clave_usu, correo_usu, token, foto_usu, estado_usu, rol_id) VALUES ('11.234.567-8', 'Felipe', 'Chávez', 'admin', 'Admin@123.', 'chavezfelipe179@gmail.com', 0, null, 1, 1);";
  categoriaProducto1: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('Teclados');";
  categoriaProducto2: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('Monitores');";
  categoriaProducto3: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('Audífonos');";
  categoriaProducto4: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('Mouse');";
  categoriaProducto5: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('Sillas');";
  categoriaProducto6: string = "INSERT OR IGNORE INTO categoria (nombre_cat) VALUES ('PC Armado');";
  registroProducto: string = "INSERT OR IGNORE INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus_prod, categoria_id) VALUES ('Teclado Mecánico Gamer Redragon Kumara K552', 34990, 15, 'El Teclado Redragon Kumara K552 es ideal para gamers que buscan un teclado compacto, con switches mecánicos, retroiluminación y excelente durabilidad. Perfecto para largas sesiones de juego.', NULL, 1, 1),('Teclado Gamer G413 Carbon - Logitech', 8990, 20, 'El Teclado Gamer G413 Carbon es ideal para jugadores que buscan precisión y rendimiento con un diseño elegante. Equipado con switches mecánicos Romer-G, ofrece una excelente respuesta táctil y durabilidad. La retroiluminación LED roja y su estructura de aluminio lo hacen perfecto para largas sesiones de juego y productividad.', NULL, 1, 1),('Teclado Gamer Xtech Arminger XTK-510S', 13990, 20, 'El Teclado Gamer Xtech Arminger XTK-510S es perfecto para gamers que buscan un teclado asequible con estilo RGB y funcionalidad. Con teclas de membrana suaves y resistentes, ofrece controles multimedia integrados y diseño a prueba de salpicaduras, ideal para cualquier setup gamer.', NULL, 1, 1), ('Teclado Gamer XPG Mage RGB Gaming Red Switch', 12990, 20, 'El Teclado Gamer XPG Mage es ideal para jugadores que buscan un teclado compacto y rápido. Equipado con switches Red mecánicos, garantiza una respuesta lineal perfecta para juegos FPS. Su iluminación RGB personalizable y diseño tenkeyless lo hacen perfecto para setups minimalistas y de alto rendimiento.', NULL, 1, 1),('Teclado Gamer HP GK100 - QWERTY Español - ProGaming', 10990, 30, 'El Teclado Gamer HP GK100 es ideal para quienes buscan un teclado mecánico con diseño ergonómico y luz RGB llamativa. Con funciones anti-ghosting y rollover, este teclado garantiza precisión en cada pulsación, perfecto para juegos competitivos y largas sesiones.', NULL, 1, 1),('Teclado Mecánico con Retroiluminación', 18990, 25, 'Este Teclado Mecánico con Retroiluminación es ideal para jugadores y usuarios que buscan la mejor experiencia de tecleo. Con interruptores mecánicos duraderos y retroiluminación LED o RGB, ofrece una combinación perfecta de estética y funcionalidad, adecuado para largas sesiones de uso intenso.', NULL, 1, 1),('Monitor 27 FHD 240HZ 1MS', 191990, 15, 'Este monitor de 27 pulgadas ofrece una resolución Full HD con una increíble frecuencia de actualización de 240 Hz y tiempo de respuesta de 1 ms. Ideal para gamers que buscan fluidez en juegos rápidos y competitivos.', NULL, 1, 2),('Monitor Gamer Samsung Odyssey G3 S27ag32 LCD 27 Negro', 178990, 15, 'El Samsung Odyssey G3 de 27 pulgadas combina calidad visual con una alta frecuencia de 165 Hz. Con soporte para FreeSync, es perfecto para gamers que buscan rendimiento y una experiencia de juego inmersiva.', NULL, 1, 2),('Audífonos Gamer Profesional E1000 USB RGB 7.1 PC', 16990, 20, 'Estos audífonos gamer E1000 ofrecen sonido envolvente 7.1, ideales para gamers que buscan una experiencia inmersiva. Con conexión USB y retroiluminación RGB, brindan comodidad y rendimiento durante largas sesiones de juego. Perfectos para PC.', NULL, 1, 3),('Mouse Gamer Redragon Vampire M720', 19900, 15, 'El Redragon Vampire M720 es un mouse ergonómico y preciso, ideal para gamers que buscan rendimiento. Con sensores ópticos de alta precisión y retroiluminación RGB, este mouse ofrece comodidad y personalización para largas sesiones de juego.', NULL, 1, 4),('Silla Gamer Wetech Color Gris/Negro Modelo LS-1118', 81290, 5, 'La Silla Gamer Wetech LS-1118 destaca por su diseño moderno en gris y negro, proporcionando comodidad y estilo. Su construcción ergonómica es ideal para largas sesiones de juego o trabajo, asegurando soporte adecuado.', NULL, 1, 5),('Pc gamer vibora black v1', 389990, 8, 'Un PC económico con Intel Core i3 10100F, GTX 1050 Ti, 8GB de RAM y 240GB SSD. Ideal para juegos básicos en 1080p con buena refrigeración y diseño compacto.', NULL, 1, 6);";
  
  // , (),(),(),(),(),() por cada () es un producto

  // Variables para guardar los datos de las consultas en las tablas
  listadoUsuarios = new BehaviorSubject([]);
  listadoTeclados = new BehaviorSubject([]);
  listadoMonitores = new BehaviorSubject([]);
  listadoAudifonos = new BehaviorSubject([]);
  listadoMouse = new BehaviorSubject([]);
  listadoSillas = new BehaviorSubject([]);
  listadoPCArmado = new BehaviorSubject([]);
  listadoProductoPorCategoria = new BehaviorSubject([]);

  // Variable para el estado de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Métodos para manipular los observables
  fetchUsuarios(): Observable<any[]> {
    return this.listadoUsuarios.asObservable();
  }

  fetchTeclados(): Observable<any[]> {
    return this.listadoTeclados.asObservable();
  }

  fetchMonitores(): Observable<any[]> {
    return this.listadoMonitores.asObservable();
  }

  fetchAudifonos(): Observable<any[]> {
    return this.listadoAudifonos.asObservable();
  }

  fetchMouse(): Observable<any[]> {
    return this.listadoMouse.asObservable();
  }

  fetchSillas(): Observable<any[]> {
    return this.listadoSillas.asObservable();
  }

  fetchPCArmado(): Observable<any[]> {
    return this.listadoPCArmado.asObservable();
  }
  fetchProductoPorCategoria():  Observable<Producto[]>{
    return this.listadoProductoPorCategoria.asObservable();
  }
  dbState() {
    return this.isDBReady.asObservable();
  }

  // Función para crear la Base de Datos
  createBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'tecnostore17.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaDetalle, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.rolUsuario1, []);
      await this.database.executeSql(this.rolUsuario2, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.categoriaProducto1, []);
      await this.database.executeSql(this.categoriaProducto2, []);
      await this.database.executeSql(this.categoriaProducto3, []);
      await this.database.executeSql(this.categoriaProducto4, []);
      await this.database.executeSql(this.categoriaProducto5, []);
      await this.database.executeSql(this.categoriaProducto6, []);

      const productoExisten = await this.database.executeSql('SELECT COUNT(*) AS total FROM producto', [])
      if (productoExisten.rows.item(0).total === 0) {

        await this.database.executeSql(this.registroProducto, [])

      } else {
        console.log('productos ya existen no se crearan denuevo');
        //un mensaje para la nada!
      }

      this.seleccionarUsuarios();
      this.seleccionarProductos();

      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  ////USUARIOS

  // Seleccionar todos los usuarios
  seleccionarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usu: res.rows.item(i).id_usu,
            rut_usu: res.rows.item(i).rut_usu,
            nombre_usu: res.rows.item(i).nombre_usu,
            apellido_usu: res.rows.item(i).apellido_usu,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            clave_usu: res.rows.item(i).clave_usu,
            correo_usu: res.rows.item(i).correo_usu,
            estado_usu: res.rows.item(i).estado_usu
          });
        }
      }
      this.listadoUsuarios.next(items as any);
    });
  }

  // Eliminar un usuario
  eliminarUsuario(id: string) {
    return this.database.executeSql('DELETE FROM usuario WHERE id_usu = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Usuario Eliminado");
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  // Modificar un usuario
  modificarUsuario(id: string, nombre: string, apellido: string) {
    return this.database.executeSql('UPDATE usuario SET nombre_usu = ?, apellido_usu = ? WHERE id_usu = ?', [nombre, apellido, id]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

    
  // Insertar un usuario
  insertarUsuario(rut: string, nombre: string, apellido: string, username: string, clave: string, correo: string, estado: string, rol_id: number) {
    return this.database.executeSql(
      'INSERT INTO usuario (rut_usu, nombre_usu, apellido_usu, nombre_usuario, clave_usu, correo_usu, estado_usu, rol_id, token, foto_usu) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [rut, nombre, apellido, username, clave, correo, estado, rol_id, 0] // 0 como valor por defecto para el token
    ).then(res => {
      this.presentAlert("Insertar", "Usuario Registrado");
      this.seleccionarUsuarios(); // Actualizar lista de usuarios
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  // En tu ServiceBDService
  validarUsuario(email: string, password: string): Promise<any> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo_usu = ? AND clave_usu = ?', [email, password])
      .then(res => {
        if (res.rows.length > 0) {
          // Devuelve el primer usuario que coincide
          return res.rows.item(0);
        }
        return null; // No se encontró ningún usuario
      })
      .catch(e => {
        console.error('Error al validar usuario:', e);
        return null; // Manejo de errores
      });
  }


  ////PRODUCTOS 
  seleccionarProductosPorCategoria(id_categoria: number){
    return this.database.executeSql('SELECT * FROM producto WHERE id_categoria = ?', [id_categoria]).then(res=>{
      let items: Producto[]=[]
      if (res.rows.length > 0){
        for (let i = 0; i < res.rows.length; i++){
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_prod: res.rows.item(i).nombre_prod,
            precio_prod: res.rows.item(i).precio_prod,
            stock_prod: res.rows.item(i).stock_prod,
            descripcion_prod: res.rows.item(i).descripcion_prod,
            foto_prod: res.rows.item(i).foto_prod,
            estatus_prod: res.rows.item(i).estatus_prod,
            categoria_id: res.rows.item(i).categoria_id,
          })
        }
        this.listadoProductoPorCategoria.next(items as any)
      }
    }).catch(e=>{
      console.log('Error','Error al insertar estrenos admin'+JSON.stringify(e))
    })
  }

  // Seleccionar todos los productos
  seleccionarProductos() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_prod: res.rows.item(i).nombre_prod,
            precio_prod: res.rows.item(i).precio_prod,
            stock_prod: res.rows.item(i).stock_prod,
            descripcion_prod: res.rows.item(i).descripcion_prod,
            foto_prod: res.rows.item(i).foto_prod,
            estatus_prod: res.rows.item(i).estatus_prod,
            categoria_id: res.rows.item(i).categoria_id
          });
        }
      }
      this.listadoTeclados.next(items as any);
      this.listadoMonitores.next(items as any);
      this.listadoAudifonos.next(items as any);
      this.listadoMouse.next(items as any);
      this.listadoSillas.next(items as any);
      this.listadoPCArmado.next(items as any);
    });
  }

  // Agregar un producto
  agregarProducto(nombre: string, precio: number, stock: number, descripcion: string, foto: Blob, categoriaId: number) {
    return this.database.executeSql('INSERT INTO producto (nombre_prod, precio_prod, stock_prod, descripcion_prod, foto_prod, estatus_prod, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, precio, stock, descripcion, foto, 'disponible', categoriaId]).then(res => {
      this.presentAlert("Agregar Producto", "Producto agregado");
      this.seleccionarProductos();
    }).catch(e => {
      this.presentAlert('Agregar Producto', 'Error: ' + JSON.stringify(e));
    });
  }

  // Eliminar un producto
  eliminarProducto(id: string) {
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?', [id]).then(res => {
      this.presentAlert("Eliminar Producto", "Producto Eliminado");
      this.seleccionarProductos();
    }).catch(e => {
      this.presentAlert('Eliminar Producto', 'Error: ' + JSON.stringify(e));
    });
  }

// Método para obtener un producto por su ID
obtenerProductoPorId(id: string) {
  return this.database.executeSql('SELECT * FROM producto WHERE id_producto = ?', [id])
    .then(res => {
      if (res.rows.length > 0) {
        return {
          id_producto: res.rows.item(0).id_producto, // ID del producto
          nombre_prod: res.rows.item(0).nombre_prod,
          precio_prod: res.rows.item(0).precio_prod,
          stock_prod: res.rows.item(0).stock_prod,
          descripcion_prod: res.rows.item(0).descripcion_prod,
          foto_prod: res.rows.item(0).foto_prod // Imagen del producto
        };
      }
      return null;
    });
}

modificarProducto(id: number, nombre: string, precio: number, stock: number, descripcion: string, imagen: Blob | string) {
  return this.database.executeSql(
    'UPDATE producto SET nombre_prod = ?, precio_prod = ?, stock_prod = ?, descripcion_prod = ?, foto_prod = ? WHERE id_producto = ?',
    [nombre, precio, stock, descripcion, imagen, id]
  ).then(res => {
    console.log('Producto modificado correctamente');
    this.seleccionarProductos(); // Actualiza la lista de productos
  }).catch(e => {
    console.error('Error al modificar el producto:', e);
    throw e;
  });
}



  // Funciones para gestionar la foto de perfil
  async obtenerFotoPerfil(id: number): Promise<any> {
    return this.database.executeSql('SELECT foto_usu FROM usuario WHERE id_usu = ?', [id]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).foto_usu;
      }
      return null;
    });
  }

  async cambiarFotoPerfil(id: number, foto: Blob) {
    return this.database.executeSql('UPDATE usuario SET foto_usu = ? WHERE id_usu = ?', [foto, id]).then(res => {
      this.presentAlert("Cambiar Foto", "Foto de perfil actualizada");
    }).catch(e => {
      this.presentAlert('Cambiar Foto', 'Error: ' + JSON.stringify(e));
    });
  }

  async eliminarFotoPerfil(id: number) {
    const foto = await this.obtenerFotoPerfil(id);
    if (foto) {
      return this.database.executeSql('UPDATE usuario SET foto_usu = NULL WHERE id_usu = ?', [id]).then(res => {
        this.presentAlert("Eliminar Foto", "Foto de perfil eliminada");
      }).catch(e => {
        this.presentAlert('Eliminar Foto', 'Error: ' + JSON.stringify(e));
      });
    } else {
      this.presentAlert('Eliminar Foto', 'No hay foto de perfil para eliminar');
    }
  }
}
