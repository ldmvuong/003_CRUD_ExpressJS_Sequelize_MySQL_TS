import db from '../models/index'; //import database
import CRUDService from '../services/CRUDService'; //import service
import { Request, Response } from "express"; // <-- Thêm type Request, Response

//hàm getHomePage
let getHomePage = async (req: Request, res: Response) => { // <-- Thêm type
  try {
    let data = await db.User.findAll(); //lấy dữ liệu từ models/index
    return res.render('homepage.ejs', {
      data: JSON.stringify(data) //trả dữ liệu data về view
    });
  } catch (e) {
    console.log(e);
  }
}

//hàm getAbout
let getAboutPage = (req: Request, res: Response) => { // <-- Thêm type
  return res.render('test/about.ejs');
}

//hàm CRUD
let getCRUD = (req: Request, res: Response) => { // <-- Thêm type
  return res.render('crud.ejs');
}

//hàm post CRUD
let postCRUD = async (req: Request, res: Response) => { // <-- Thêm type
  let message = await CRUDService.createNewUser(req.body); //goi service
  console.log(message);
  return res.send('Post crud to server');
}

//hàm findAll CRUD
let getFindAllCrud = async (req: Request, res: Response) => { // <-- Thêm type
  let data = await CRUDService.getAllUser();
  return res.render('users/findAllUser.ejs', {
    datalist: data
  }); //gọi view và truyền dữ liệu ra view
}

//hàm lấy dữ liệu để edit
let getEditCRUD = async (req: Request, res: Response) => { // <-- Thêm type
  let userId = req.query.id;
  if (userId) { //check Id
    let userData = await CRUDService.getUserInfoById(userId as string); // <-- Thêm type cast
    // console.log(userData);
    return res.render('users/editUser.ejs', {
      data: userData
    });
  } else {
    return res.send('không lấy được id');
  }
}

let putCRUD = async (req: Request, res: Response) => { // <-- Thêm type
  let data = req.body;
  let data1 = await CRUDService.updateUser(data); //update rồi hiển thị lại danh sách user
  return res.render('users/findAllUser.ejs', {
    datalist: data1
  });
}

let deleteCRUD = async (req: Request, res: Response) => { // <-- Thêm type
  let id = req.query.id; //vì trên view ?id
  if (id) {
    await CRUDService.deleteUserById(id as string); // <-- Thêm type cast
    return res.send('Deleted!!!!!!!!!!!!')
  } else {
    return res.send('Not find user')
  }
}

//export ra object
export default { // <-- Đã đổi sang cú pháp export của TS
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getFindAllCrud: getFindAllCrud,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD
}