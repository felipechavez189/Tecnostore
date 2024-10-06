import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBDService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usu INTEGER PRIMARY KEY AUTOINCREMENT, rut_usu VARCHAR(15) NOT NULL, nombre_usu VARCHAR(50) NOT NULL, apellido_usu VARCHAR(50) NOT NULL, nombre_usuario VARCHAR(50) NOT NULL, clave_usu VARCHAR(20) NOT NULL, correo_usu VARCHAR(50) NOT NULL, taken VARCHAR(20) NOT NULL, estado_usu VARCHAR(20) NOT NULL, rol_id INTEGER NOT NULL, FOREIGN KEY (rol_id) REFERENCES rol(id_rol));";
  
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(50) NOT NULL);";
  
  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT, f_venta INTEGER NOT NULL, total_venta INTEGER NOT NULL, usuario_id INTEGER NOT NULL, estado_id INTEGER NOT NULL, FOREIGN KEY (usuario_id) REFERENCES usuario(id_usu), FOREIGN KEY (estado_id) REFERENCES estado(id_estado));";
  
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nombre_est VARCHAR(20) NOT NULL);";
  
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (id_producto INTEGER PRIMARY KEY AUTOINCREMENT, nombre_prod VARCHAR(50) NOT NULL, precio_prod INTEGER NOT NULL, stock_prod INTEGER NOT NULL, descripcion_prod VARCHAR(100) NOT NULL, foto_prod BLOB NOT NULL, estatus_prod VARCHAR(20) NOT NULL, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES categoria(id_categoria));";
  
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, cantidad_det INTEGER NOT NULL, subtotal_det INTEGER NOT NULL, venta_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, FOREIGN KEY (venta_id) REFERENCES venta(id_venta), FOREIGN KEY (producto_id) REFERENCES producto(id_producto));";
  
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cat VARCHAR(50) NOT NULL);";
  
  // Variables para guardar los datos de las consultas en las tablas
  listadoUsuarios = new BehaviorSubject([]);
  listadoProductos = new BehaviorSubject([]);
  
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

  fetchProductos(): Observable<any[]> {
    return this.listadoProductos.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  // Función para crear la Base de Datos
  createBD() {
    // Verificar si la plataforma está disponible
    this.platform.ready().then(() => {
      // Crear la Base de Datos
      this.sqlite.create({
        name: 'tecnostore.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // Capturar la conexión a la BD
        this.database = db;
        // Llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      // Ejecutar la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaDetalle, []);

      this.seleccionarUsuarios();
      this.seleccionarProductos();

      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

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
            descripcion_prod: res.rows.item(i).descripcion_prod
          });
        }
      }
      this.listadoProductos.next(items as any);
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
    return this.database.executeSql('INSERT INTO usuario (rut_usu, nombre_usu, apellido_usu, nombre_usuario, clave_usu, correo_usu, estado_usu, rol_id) VALUES (?,?,?,?,?,?,?,?)',
      [rut, nombre, apellido, username, clave, correo, estado, rol_id]).then(res => {
        this.presentAlert("Insertar", "Usuario Registrado");
        this.seleccionarUsuarios();
      }).catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      });
  }
}
