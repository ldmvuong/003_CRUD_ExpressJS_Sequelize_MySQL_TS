import express, { Application } from "express"; // <-- Đã thêm { Application }

let configViewEngine = (app: Application) => { // <-- Đã thêm type cho app
  app.use(express.static("./src/public")); //Thiết lập thư mục tĩnh chứa images, css,..
  app.set("view engine", "ejs"); //thiết lập viewEngine
  app.set("views", "./src/views") //thư mục chứa views
}

export default configViewEngine; 